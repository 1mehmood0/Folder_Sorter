let fs=require('fs');
let folder=require("fs-extra");
let paths=require('path');
let inputArr=process.argv;
const path=inputArr.slice(2);
const destipath=paths.join(path[0],"/Organized_files");


const types={
    image:['.jpg', '.JPG', '.png' ,'.PNG' ,'.jpeg' ,'.JPEG'],
    video:['.mp4','.mkv'],
    docs:['.docx','.pdf','.doc','.xlsx','.txt'],
    app:['.exe','.apk']
}


const getExtension=(file)=>{
    let ext=paths.extname(file);
    for(let type in types)
    {   let subtype=types[type];
        for(let i=0;i<subtype.length;i++)
        {
            if(ext==subtype[i])
            {
                return type;
            }
        }

    }
    return "others";
    
}

const organiser=(segpath,destpath)=>{
   
    if(segpath==undefined){
        console.log("enter a path");
        return;
    }
    else{
        if(fs.existsSync(segpath))
        {   
            if(!fs.existsSync(destpath))
            {
                fs.mkdirSync(destipath);
            }
            else{
                    let allfiles=fs.readdirSync(segpath);
                    for(let i=0;i<allfiles.length;i++)
                    {
                            if(allfiles[i]!=("Organized_files"))
                            {   
                                    let folderType= getExtension(allfiles[i]);
                                //console.log(folderType);
                                    let orgFilePath=paths.join(segpath,allfiles[i]);  
                                //console.log("org file path",orgFilePath);
                                    let desFolder=paths.join(destpath,folderType);
                                //console.log("location of new folder",desFolder);
                                    let desFilePath=paths.join(desFolder,allfiles[i]);
                                //console.log("New file path",desFilePath);
                                //sendFile(orgFilePath,desFilePath);
                                    if(folderType=="others")
                                        {
                                            folder.moveSync(orgFilePath,desFilePath,{overwrite:true});
                                                console.log(allfiles[i],"moved to---->",desFolder);
                                        }
                                        else
                                        {
                                            if(fs.existsSync(desFolder))
                                            {
                                                folder.moveSync(orgFilePath,desFilePath,{overwrite:true});
                                                console.log(allfiles[i],"moved to---->",desFolder);
                                            }
                                            else
                                            {
                                                fs.mkdirSync(desFolder);
                                            }
                                        }
                                    
                            }
                    }       
            
                }
            }
        else
        {
            console.log("path doesnt exist",segpath);
        }
    }

}
organiser(path[0],destipath);