const User = require("../DataBase/userSchema")

// taking data from req.body and store the data in mongodb Database 
const PostData = async(req,res)=>{
    const {id,first_name,last_name,email,gender,avatar,status,last_login,role} = req.body
    
    try{
        const user = new User({id,first_name,last_name,email,gender,avatar,status,last_login,role})
        await user.save()
        res.status(200).json({message:"sucsessfull"}) 
    }catch(err){
        console.log(err)
        res.send(err)
    } 
}

const GetData = async(req,res)=>{
    const user = await User.find({})
    res.send(user)
}


// getting data from id
const GetDataById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.find({_id:{ $in: userId } });
      if (!user) {
        throw new Error('User not found');
      }
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  
// updating data by id
const UpdateDataById = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }

// delete data by id
const DeleteDataById = async (req, res) => {
    const userId = req.params.id;
    const deleteUser = req.body;
    try {
      const user = await User.findByIdAndDelete(userId, deleteUser, { new: true });
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }



  

const HomePage = (req,res)=>{
    res.status(200).send("Welcome 🙌 ");
}


module.exports = {  PostData,
                    HomePage,
                    GetDataById,
                    UpdateDataById,
                    GetData,
                    DeleteDataById  }