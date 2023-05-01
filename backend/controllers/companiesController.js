const companies = require("../models/companiesSchema");

// getCompaniesTable
exports.getCompaniesTable = async (req, res) => {
    const search = req.query.search || "";
    const gender = req.query.gender || "";
    const status = req.query.status || "";
    const sort = req.query.sort || "";
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 2;

    const query = {
        fname: { $regex: search, $options: "i" },
    };

    if (gender !== "all") {
        query.gender = gender;
    }

    if (status !== "all") {
        query.status = status;
    }

    try {
        const skip = (page - 1) * ITEM_PER_PAGE; // 1 * 4 = 4

        const count = await companies.countDocuments(query);

        const companiesTableData = await companies
            .find(query)
            .sort({ datecreated: sort == "new" ? -1 : 1 })
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        const pageCount = Math.ceil(count / ITEM_PER_PAGE); // 8 /4 = 2

        res.status(200).json({
            Pagination: {
                count,
                pageCount,
            },
            companiesTableData,
        });
    } catch (error) {
        res.status(401).json(error);
    }
}

// addNewCompany
exports.addNewCompany = async (req, res) => {
    const { fname, lname, email, mobile, gender, location, status } = req.body;
    if (
        !fname ||
        !lname ||
        !email ||
        !mobile ||
        !gender ||
        !location ||
        !status
    ) {
        res.status(401).json("All Inputs is required");
    }
    try {
        const preuser = await companies.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse");
        } else {
            const datecreated = new Date();

            const companiesData = new companies({
                fname,
                lname,
                email,
                mobile,
                gender,
                location,
                status,
                datecreated,
            });
            await companiesData.save();
            res.status(201).json(companiesData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("Adding employee catch block error", error);
    }
}

// getSingleCompanyDetails
exports.getSingleCompanyDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const companiesdata = await companies.findOne({ _id: id });
        res.status(200).json(companiesdata);
    } catch (error) {
        res.status(401).json(error);
    }
}

// updateCompanyDetails
exports.updateCompanyDetails = async (req, res) => {
    const { id } = req.params;
    const {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
    } = req.body;

    const dateUpdated = new Date();

    try {
        const updatecompany = await companies.findByIdAndUpdate(
            { _id: id },
            {
                fname,
                lname,
                email,
                mobile,
                gender,
                location,
                status,
                dateUpdated,
            },
            {
                new: true,
            }
        );

        await updatecompany.save();
        res.status(200).json(updatecompany);
    } catch (error) {
        res.status(401).json(error);
    }
}

// deleteCompany
exports.deleteCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCompany = await companies.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteCompany);
    } catch (error) {
        res.status(401).json(error);
    }
}