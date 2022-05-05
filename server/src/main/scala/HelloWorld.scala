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
import java.io.IOException
import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
object HelloWorld {
  def main(args: Array[String]): Unit = {
    
    val copybook =
      """        01  COMPANY-DETAILS.
        |            05  SEGMENT-ID           PIC X(5).
        |            05  SEGMENT-ID-P         REDEFINES SEGMENT-ID
        |                                      PIC S9(8) COMP-3.
        |            05  COMPANY-ID           PIC X(10).
        |            05  STATIC-DETAILS.
        |               10  COMPANY-NAME      PIC X(15).
        |               10  ADDRESS           PIC X(25).
        |               10  TAXPAYER.
        |                  15  TAXPAYER-TYPE  PIC X(1).
        |                  15  TAXPAYER-STR   PIC X(8).
        |                  15  TAXPAYER-NUM  REDEFINES TAXPAYER-STR
        |                                     PIC S9(8) COMP.
        |
        |            05  CONTACTS REDEFINES STATIC-DETAILS.
        |               10  PHONE-NUMBER      PIC X(17).
        |               10  CONTACT-PERSON    PIC X(28).
        |""".stripMargin

    val parsedSchema = CopybookParser.parseSimple(copybook)
    val ast = parsedSchema.ast


    var s = Set[Map[String, Any]]()
    for (c <- ast.children) {
        s = s + printCopyBook(c, 0)
    }

    try{    
      val file = new File("C:\\Users\\ohmoo\\projects\\linda-imam\\target\\statement.json");
      val filewriter = new FileWriter(file);

      val mapper = JsonMapper.builder()
        .addModule(DefaultScalaModule)
        .build()
      
      filewriter.write(mapper.writeValueAsString(s))
      filewriter.close()
    }catch { case e: IOException => 
      System.out.println(e);
    }
  }

  private def printCopyBook(statement: Statement, pLevel: Int): Map[String, Any] = {

    statement match {
      case v:Primitive => {
        try{
          statementToMap(v)
        }catch { case e: IOException => 
          System.out.println(e);
          Map[String, Any]()
        }
      }
      case v:Group => {
        var s = Set[Map[String, Any]]()
        for(c <- v.children) {
          s = s + printCopyBook(c, pLevel + 1)
        }
        Map(v.name -> s)
      }
      case _ => throw new IllegalStateException("Unknown AST object encountered.")
    }
  }

  private def statementToMap(statement: Primitive): Map[String, Any] = {
    Map(
                "level"-> statement.level,
                "name"-> statement.name,
                "lineNumber"-> statement.lineNumber,
                "dataType"-> Map("pic"->statement.dataType.pic, "originalPic" -> statement.dataType.originalPic),
                "redefines"-> {statement.redefines match { case Some(s) => s case None => ""}},
                "isRedefined"-> statement.isRedefined,
                "occurs"-> {statement.occurs match { case Some(s) => s case None => ""}},
                "to"->  {statement.to match { case Some(s) => s case None => ""}},
                "dependingOn"-> {statement.dependingOn match { case Some(s) => s case None => ""}},
                "dependingOnHandlers"-> statement.dependingOnHandlers,
                "isFiller"-> statement.isFiller,
                "binaryProperties"-> statement.binaryProperties,
              )
  }
}