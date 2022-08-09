import fs from 'fs';
import path from 'path';
import {NextApiRequest, NextApiResponse} from "next";

export function contentPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}
export function extractContent(filePath: fs.PathOrFileDescriptor) {
  const fileData = fs.readFileSync(filePath);
  // @ts-ignore
  return JSON.parse(fileData);
}
export default function handler(req:NextApiRequest,res:NextApiResponse){
  if(req.method==='GET'){
    const filePath = contentPath();
    const data = extractContent(filePath);
    res.status(200).json(data);
  }
  else if (req.method === 'POST') {
    const content=req.body.content;
    const newContent = {
        id:content.id,
        name:content.name,
        zonecode:content.zonecode,
        address:content.address
    }
    const filePath = contentPath();
    const data = extractContent(filePath);
    data.push(newContent);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ newContent });
  }
}