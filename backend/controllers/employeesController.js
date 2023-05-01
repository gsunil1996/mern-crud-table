const employees = require("../models/employeesSchema");

// getEmployeesTable
exports.getEmployeesTable = async (req, res) => {
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

        const count = await employees.countDocuments(query);

        const employeesTableData = await employees
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
            employeesTableData,
        });
    } catch (error) {
        res.status(401).json(error);
    }
}

// addNewEmployee
exports.addNewEmployee = async (req, res) => {
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
        const preuser = await employees.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse");
        } else {
            const datecreated = new Date();

            const employeeData = new employees({
                fname,
                lname,
                email,
                mobile,
                gender,
                location,
                status,
                datecreated,
            });
            await employeeData.save();
            res.status(201).json(employeeData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("Adding employee catch block error", error);
    }
}

// getSingleEmployeeDetails
exports.getSingleEmployeeDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const employeesdata = await employees.findOne({ _id: id });
        res.status(200).json(employeesdata);
    } catch (error) {
        res.status(401).json(error);
    }
}

// updateEmployeeDetails
exports.updateEmployeeDetails = async (req, res) => {
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
        const updateEmployee = await employees.findByIdAndUpdate(
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

        await updateEmployee.save();
        res.status(200).json(updateEmployee);
    } catch (error) {
        res.status(401).json(error);
    }
}

// deleteEmployee
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteEmployee = await employees.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteEmployee);
    } catch (error) {
        res.status(401).json(error);
    }
}