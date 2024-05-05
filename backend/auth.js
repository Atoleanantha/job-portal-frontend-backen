const seekersModel =require("./model")

const recruiterModel=require("./companymodel")
const companymodel = require("./companymodel")

const bcrypt= require('bcrypt')

// const login= async(req,res)=>{

//     const {email,password,isApplicant}=req.body

//     try{

//         if(isApplicant){
//             const data=await seekersModel.findOne({email})
//             const result=await bcrypt.compare(password,data.password)
//             console.log("result: ",result)
//             if(result){
//                 res.status(200).send({result,data,msg:"Login succesful!"})

//             }else{
//                 res.status(400).send({result,data,msg:"Login failed!"})
//             }

//         }else{
//             const data=await companymodel.findOne({email})
//             const result=await bcrypt.compare(password,data.password)
//             console.log("result:",result);
//             if(result){
            
//                 res.status(200).send({result,data,msg:"Login succesful!"})

//             }else{
//                 res.status(400).send({result,data,msg:"Login failed!"})
//             }
//         }

//     }catch(error){

//         res.status(400).send({msg:"Server internal error!"})
//     }
// }


// const register=async(req,res)=>{
//     const {email,password,isApplicant}=req.body

//     try{
//         if(isApplicant){
//             const data=await seekersModel.findOne({email})
//             if(data){
//                 return res.status(400).send({msg:"User already registered. Please login!"})
//             }

//             const saltRound=10;
//             const password=await bcrypt.hash(password,saltRound)
//             const userData = new  seekersModel({
//                 email,
//                 password,
//             })
          
//             data=await userData.save()
//             res.status(200).save({result,data,msg:"Register succesful!"})

         

//         }else{
//             const data=await companymodel.findOne({email})
//             if(data){
//                 return res.status(400).send({msg:"User already registered. Please login!"})
//             }

//             const saltRound=10;
//             const password=await bcrypt.hash(password,saltRound)
//             const userData = new  companymodel({
//                 email,
//                 password,
//             })
          
//             data=await userData.save()
//             res.status(200).save({result,data,msg:"Register succesful!"})
//         }
//         }catch(error){

//         res.status(400).send({msg:"Server internal error!"})
//     }
// }
const login = async (req, res) => {
    const { email, password, isApplicant } = req.body;

    try {
        let data;

       
        // Determine which model to use based on isApplicant flag
        if (isApplicant==='true') {
            data = await seekersModel.findOne({ email });
        } else {
            data = await companymodel.findOne({ email });
        }
 
        console.log('====================================');
        console.log("data:",data);
        console.log('====================================');
        // If user not found, return login failed
        if (!data) {
            return res.status(400).send({ msg: "Login failed! User not found." });
        }

        // Compare passwords
        const result = await bcrypt.compare(password, data.password);

        // If password matches, send success message
        if (result) {
            res.status(200).send({ result, data, msg: "Login successful!" });
        } else {
            // If password does not match, send login failed message
            res.status(400).send({ result, data, msg: "Login failed! Incorrect password." });
        }
    } catch (error) {
        // Handle server internal error
        res.status(500).send({ msg: "Server internal error!" });
    }
};


const register = async (req, res) => {
    const { email, password, isApplicant } = req.body;

    try {
        // Check if the email is already registered based on the isApplicant flag
        let data;
        if (isApplicant) {
            data = await seekersModel.findOne({ email });
        } else {
            data = await companymodel.findOne({ email });
        }

        // If user already exists, return an error message
        if (data) {
            return res.status(400).send({ msg: "User already registered. Please login!" });
        }

        // Hash the password
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        // Create a new user based on the isApplicant flag
        if (isApplicant) {
            const userData = new seekersModel({
                email,
                password: hashedPassword, // Use the hashed password
            });
            data = await userData.save();
        } else {
            const userData = new companymodel({
                email,
                password: hashedPassword, // Use the hashed password
            });
            data = await userData.save();
        }

        // Return success message
        res.status(200).send({ result: data, msg: "Registration successful!" });
    } catch (error) {
        // Handle server internal error
        res.status(500).send({ msg: "Server internal error!" });
    }
};

module.exports={login,register}