const express = require("express")
const router = express.Router()
const {
    PostData,
    HomePage,
    GetDataById,
    UpdateDataById,
    GetData,
    DeleteDataById
} = require("../controllers")


// GET
router.get("/home",HomePage)
router.get("/getdata",GetData)
router.get("/getdata/:id",GetDataById)

// POST
router.post("/PostData",PostData)

// UPDATE
router.put('/updatedata/:id',UpdateDataById );

router.delete('/deletedata/:id',DeleteDataById)
// EXPORTS
module.exports = router

