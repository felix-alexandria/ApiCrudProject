import http, {ServerResponse, IncomingMessage} from "http";

const Port = 2309;

interface iMessage{
    message: string,
    data: null | {} |{}[],
    success: boolean
};
type iUsers ={
    id: number,
    userName: string,
    salary: string,
    expenses: string,
    paymentType: string,
    occupation: string
}

let arrUsers: iUsers[] = [
    {
        id: 1,
        userName: "Mr Nonso Amadi",
        salary: "₦50000",
        expenses: "₦45000",
        paymentType: "Monthly",
        occupation: "Banker"
    },
    {
        id: 2,
        userName: "Mrs Ngozi Nduka",
        salary: "4500",
        expenses: "₦5000",
        paymentType: "Daily",
        occupation: "Trader"

    },
    {
        id: 3,
        userName: "Mr Ola Adeniyi",
        salary: "₦3500",
        expenses: "₦4000",
        paymentType: "Weekly",
        occupation: "Labour"

    },
    {
        id: 4,
        userName: "Mrs Selemo salawu-lawa",
        salary: "₦500000",
        expenses: "₦350000",
        paymentType: "Monthly",
        occupation: "Fintech"

    },
    {
        id: 5,
        userName: "Mr Daneil Eromonsele",
        salary: "₦65000",
        expenses: "₦70000",
        paymentType: "Monthly",
        occupation: "Truck-Driver"

    },
    {
        id: 6,
        userName: "Mrs Sunday Peter",
        salary: "₦50000",
        expenses: "₦50000",
        paymentType: "Monthly",
        occupation: "Banker"

    },
];

const Server = http.createServer((req:IncomingMessage,  res: ServerResponse<IncomingMessage>)=>{
   res.setHeader("content-Type", "application/json");
 
   let status = 404
   const response:iMessage = {
     message: "failed check browser",
     success: false,
     data: null
   };

   let {method, url} = req;

   let Database:any = []
 
   req.on("data", (chunk:any)=>{
      Database.push(chunk)
   }).on("end", ()=>{
    //    if(method === "GET" && url === "/Nzube"){
    //      status = 200;
    //      response.message = "sucessful";
    //      response.data = arrUsers;
    //      response.success =true;

    //      res.write(JSON.stringify({response, status}));
    //     res.end()
    //    }else{
    //     status = 404;
    //     response.message = "unable to run";
    //     response.data = null;
    //     response.success =false;

    //     res.write(JSON.stringify({response, status}));
    //     res.end()
    //    }

       //post
       if (url === "/" && method === "POST") {
           status = 201;
          const post = JSON.parse(Database)
          arrUsers.push(post);
           
          response.message = "upload successful";
          response.data = arrUsers;
          response.success = true;

          res.write(JSON.stringify({response, status}));
          res.end();
       }else{
        status = 404;
        response.message = "upload failed";
        response.data = null;
        response.success = false;

        res.write(JSON.stringify({response, status}));
        res.end();
       };

    // //patch 
    // if(method === "PATCH"){
    //    const patch = JSON.parse(Database);

    //    let newData:any = url?.split("/")[1];
    //    let newDataValue = parseInt(newData);

    //    let get = arrUsers.some((el)=>{
    //     return el.id === newDataValue;
    //    });

    //    if (!get) {
    //       status = 404;

    //       response.message = "user don't exits";
    //       response.data = null;
    //       response.success = false;

    //       res.write(JSON.stringify({response, status}));
    //       res.end();
    //    }else{
    //        const updated = patch.userName;

    //        arrUsers = arrUsers.map((user:any)=>{
    //            if(user?.id === newDataValue){
    //               return{
    //                 id: user?.id,
    //                 userName: updated,
    //                 occupation: user?.occupation,
    //                 salary: user?.salary,
    //                 expenses: user?.expenses,
    //                 paymentType: user?.paymentType
    //               }
    //            }
    //            return user;
    //        });
    //        status = 200;
    //        response.data = arrUsers;
    //        response.message = "update successful";
    //        response.success = true;

    //        res.write(JSON.stringify({response, status}));
    //        res.end();
    //    }
    // }

    // //PUT method
    // if (method === "PUT") {
    //       const build = JSON.parse(Database);

    //       let Data:any = url?.split("/")[1];
    //       let newValue = parseInt(Data);

    //       let find = arrUsers.some((el)=>{
    //         return el.id === newValue;
    //       });
    //       if (!find) {
    //         status = 404;
  
    //         response.message = "user don't exits";
    //         response.data = null;
    //         response.success = false;
            
    //         res.write(JSON.stringify({response, status}));
    //         res.end();
    //     }else{
    //         const updated = build.salary;
            
    //         arrUsers = arrUsers.map((user:any)=>{
    //              if(user?.id === newValue){
    //                  return{
    //                      id: user?.id,
    //                      userName:user.userName,
    //                      occupation: user?.occupation,
    //                      salary: updated,
    //                      expenses: user?.expenses,
    //                      paymentType: user?.paymentType
    //                     }
    //                 }
    //                 return user;
    //             });
    //             status = 200;
    //             response.data = arrUsers;
    //             response.message = "update successful";
    //             response.success = true;
                
    //             res.write(JSON.stringify({response, status}));
    //             res.end();
    //         }
    //     }

    //    //Delete method
    //    if (method === "DELETE") {
    //     // const build = JSON.parse(Database);

    //     let Data:any = url?.split("/")[1];
    //     let newValue = parseInt(Data);

    //      arrUsers = arrUsers.filter((el)=>{
    //       return el.id !== newValue;
    //     });
    //     status = 200,
    //     response.message = "Account Deleted";
    //     response.data = arrUsers;
    //     response.success = true;

    //     res.write(JSON.stringify({response, status}));
    //     res.end()
    // }else{
    //     status = 404,
    //     response.message = "user not found";
    //     response.data = null;
    //     response.success = false;

    //     res.write(JSON.stringify({response, status}));
    //     res.end()
    // }

    // //Get expenses
    // if (method === "GET") {
    //     const build:any = url?.split("/")[1];
    //     let newValue = parseInt(build);

    //     let test:any = arrUsers.filter((el)=>{
    //         return el.id === newValue;
    //     });
        
    // } 
   });

});
Server.listen(Port, ()=>{
    console.log("server listening up and running", Port);
})