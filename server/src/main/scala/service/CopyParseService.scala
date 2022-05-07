package src.main.scala.service

import java.io.File
import java.io.FileWriter
import java.io.IOException
import java.math.BigInteger
import java.security.MessageDigest
import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import src.main.scala.model.CopyBook
import java.util.Date

class CopyParseService {
    
    def parse(path: String): String = {
        try{    
            val copy = new CopyBook(path)
            val outFilePath = this.getFilePath(copy)
            val file = new File(outFilePath);
            val filewriter = new FileWriter(file);            
            filewriter.write(copy.toJson())
            filewriter.close()
            outFilePath
        }catch { case e: IOException => 
            System.out.println(e);
            ""
        }
    }

    private def getFilePath(copy : CopyBook): String = {
        String.format("%s\\statement_%s_%s.json", getBasePath(), copy.name, this.getFileNameHash(copy.path))
    }

    private def getBasePath(): String = {
        "C:\\Users\\ohmoo\\projects\\linda-imam\\target"
    }

    private def getFileNameHash(path: String): String = {
        val digest = MessageDigest.getInstance("SHA-256")
        val seed = path + new Date().toString()
        val result = digest.digest(seed.getBytes())
        val hash = String.format("%040x", new BigInteger(1, result))
        hash
    }

}