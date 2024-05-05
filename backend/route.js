
const express =require('express')
const multer=require('multer')
const controller=require("./controller")
const server=require("./server")
const auth=require("./auth")

const route=express.Router()

route.post('/register',controller.addUser) //applicant

route.post('/registercompany',controller.addCompany)//company

route.post('/login',auth.login) //login for both
// route.post('/register1',auth.register)s

route.get('/findall',controller.getData)//applicant

route.get('/finduser/:email',controller.getUserById)//applicant

route.put('/update/:email',controller.updateData)//applicant

route.put('/updatecompany/:email',controller.updateCompanyData)//comapny

route.delete('/deleteuser/:email',controller.deleteUser)

route.delete('/deletepost/:email/:jobId',controller.deleteJobPost)

route.put('/postjob/:email',controller.postJob)

route.get('/findcompany/:email',controller.findCompany)

route.get('/getalljobs/:email',controller.getAllPostedJobsOfAdmin)


route.get('/displayJobs',controller.displayJobs)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      console.log('====================================');
      console.log("filename body:",req.body)
      console.log('====================================');
      const filename = req.body.seekerId ? req.body.seekerId : '-' + file.originalname;

      cb(null,filename);
    },
  });
const upload = multer({ storage: storage });

route.post('/applytojob/:jobPostId',upload.single('resume'),controller.applyToJob)

route.post('/filterresume',controller.filterResume);
module.exports=route

