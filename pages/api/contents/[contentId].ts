import {NextApiRequest, NextApiResponse} from "next";
import { contentPath, extractContent } from "./index";
import fs from "fs";

export default function handler(req:NextApiRequest,res:NextApiResponse){
  const {contentId}=req.query;

  if(req.method==='GET'){
    const filePath = contentPath();
    const contents = extractContent(filePath);
    const content=contents.find((content: { id: any; })=>content.id! == Number(contentId))
    res.status(200).json(content)
  }
  else if(req.method==="DELETE"){
    const filePath = contentPath();
    const contents = extractContent(filePath);
    const deletedContent=contents.find((content: { id: any; })=>content.id! == Number(contentId))
    const index=contents.findIndex((content: { id: any; })=>content.id! == Number(contentId))

    contents.splice(index,1);
    fs.writeFileSync(filePath, JSON.stringify(contents));
    res.status(200).json(deletedContent)
  }
}