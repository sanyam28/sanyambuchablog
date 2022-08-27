import Session from "../../../models/Session"
import dbConnect from "../../../middleware/mongoose"

const handler = async (req, res) => {
        // await dbConnect()
        // const allsession = await Session.findOne({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MmVmODE0YTA3Yzk4N2U2ZjI4ZTQ2NWIiLCJpZGVudGl0aXkiOiJzYW55YW0yMyIsImVtYWlsIjoiYnVjaGFzYW55YW0yM0BnbWFpbC5jb20iLCJuYW1lIjoiU2FueWFtIEJ1Y2hhIiwiaWF0IjoxNjYxNTgxNzUxLCJleHAiOjE2NjE3NTQ1NTF9.5bBvmT235vHvYv1VRAOgqXJ-PQkk6PWYRXrCEqVQcMY" })
        // await allsession.delete()
        // console.log(allsession)
        // res.json({allsession})

    if (req.method == 'POST') {
        await dbConnect()
        console.log(req.body)
        const cses = await Session.findOne({token: req.body.sessiontoken})
        if(cses){
            const deletesession = await cses.delete()
            if(deletesession){
                res.json({"success": "deleted"})
            }
            else{
                res.json({"success": "something went wrong"})
            }
        }
        else{
            res.json({"success": "already deleted"})
        }
        // const usession = await Session.findByIdAndDelete(req.body._id)
        // if(usession){
        //     res.json({"success": "deleted"})
            res.json({"success": "deleted"})
        // }
        // else{
        //     res.json({"error": "Something went wrong"})
        // }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
