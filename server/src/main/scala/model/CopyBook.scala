package src.main.scala.model

import za.co.absa.cobrix.cobol.parser.CopybookParser
import za.co.absa.cobrix.cobol.reader.schema.CobolSchema
import za.co.absa.cobrix.cobol.parser.ast.Primitive
import za.co.absa.cobrix.cobol.parser.ast.Statement
import za.co.absa.cobrix.cobol.parser.ast.Group
import za.co.absa.cobrix.cobol.parser.ast.datatype.Integral
import za.co.absa.cobrix.cobol.parser.ast.datatype.Decimal
import za.co.absa.cobrix.cobol.parser.ast.datatype.AlphaNumeric
import java.io.File
import java.io.FileWriter
import java.io.FileReader
import java.io.IOException
import java.math.BigInteger
import java.security.MessageDigest
import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import java.util.Date
import java.io.BufferedReader
import scala.io.Source

class CopyBook(val path: String) {

    private val parsedSchema = CopybookParser.parseSimple(this.getCopyBookFile())
    private val ast = parsedSchema.ast
    /**
      * Name of the copy book.
      * It will be name of a statement at the highest level, or blank if copy book is not qualified.
      */
    val name: String = (() => {
        for(c <- ast.children) {
            c.name
        }
        ""
    })()

    /**
      * Translate copy book schema to json.
      *
      * @return Translated copy book schema in string.
      */
    def toJson(): String = {
        var s = Set[Map[String, Any]]()
        for (c <- ast.children) {
            s = s + mapStatement(c)
        }
        val mapper = JsonMapper.builder()
            .addModule(DefaultScalaModule)
            .build()
        mapper.writeValueAsString(s)
    }

    /**
      * Parse a statement.
      * It creates key/value map in case of primitive, otherwise parse each child.
      * Note that is could be called recursively.
      *
      * @param statement Statement at any level of a copy book.
      * @return key/value map of the parsed statement.
      */
    private def mapStatement(statement: Statement): Map[String, Any] = {
        statement match {
            case v:Primitive => {
                try{
                    Map(
                        "level"-> v.level,
                        "name"-> v.name,
                        "lineNumber"-> v.lineNumber,
                        "dataType"-> Map("pic"->v.dataType.pic, "originalPic" -> v.dataType.originalPic),
                        "redefines"-> {v.redefines match { case Some(s) => s case None => ""}},
                        "isRedefined"-> v.isRedefined,
                        "occurs"-> {v.occurs match { case Some(s) => s case None => ""}},
                        "to"->  {v.to match { case Some(s) => s case None => ""}},
                        "dependingOn"-> {v.dependingOn match { case Some(s) => s case None => ""}},
                        "dependingOnHandlers"-> v.dependingOnHandlers,
                        "isFiller"-> v.isFiller,
                        "binaryProperties"-> v.binaryProperties,
                    )
                }catch { case e: IOException => 
                    System.out.println(e);
                    Map[String, Any]()
                }
            }
            case v:Group => {
                var s = Set[Map[String, Any]]()
                for(c <- v.children) {
                s = s + mapStatement(c)
                }
                Map(
                    "level"-> v.level,
                    "name"-> v.name,
                    "lineNumber"-> v.lineNumber,
                    "redefines"-> {v.redefines match { case Some(s) => s case None => ""}},
                    "isRedefined"-> v.isRedefined,
                    "occurs"-> {v.occurs match { case Some(s) => s case None => ""}},
                    "to"->  {v.to match { case Some(s) => s case None => ""}},
                    "dependingOn"-> {v.dependingOn match { case Some(s) => s case None => ""}},
                    "dependingOnHandlers"-> v.dependingOnHandlers,
                    "isFiller"-> v.isFiller,
                    "binaryProperties"-> v.binaryProperties,
                    "statements" -> s
                )
            }
            case _ => throw new IllegalStateException("Unknown AST object encountered.")
        }
    }

    /**
      * Resolve copy book path and get file contents.
      *
      * @return Copy book contents at string.
      */
    private def getCopyBookFile(): String = {
        var contents: String = "";
        val source = Source.fromFile("C:\\Users\\ohmoo\\projects\\linda-imam\\client\\media\\test.cpy")
        source.getLines.foreach(ln => contents += (ln + "\n"))
        source.close
        contents.stripMargin
    }


}