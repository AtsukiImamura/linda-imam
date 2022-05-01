import za.co.absa.cobrix.cobol.parser.CopybookParser
import za.co.absa.cobrix.cobol.reader.schema.CobolSchema
import za.co.absa.cobrix.cobol.parser.ast.Primitive
import za.co.absa.cobrix.cobol.parser.ast.Statement
import za.co.absa.cobrix.cobol.parser.ast.Group
import za.co.absa.cobrix.cobol.parser.ast.datatype.Integral
import za.co.absa.cobrix.cobol.parser.ast.datatype.Decimal
import za.co.absa.cobrix.cobol.parser.ast.datatype.AlphaNumeric
object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")

    // val sparkBuilder = SparkSession.builder().appName("Example")
    // val spark = sparkBuilder
    //   .getOrCreate()

    val copybook =
      """        01  COMPANY-DETAILS.
        |            05  SEGMENT-ID           PIC X(5).
        |            05  SEGMENT-ID-P         REDEFINES SEGMENT-ID
        |                                      PIC S9(8) PACKED-DECIMAL.
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
    // val cobolSchema = new CobolSchema(parsedSchema)
    val ast = parsedSchema.ast
    for (c <- ast.children) {
        printCopyBook(c, 0)
    }
  }

  private def printCopyBook(statement: Statement, pLevel: Int): Unit = {
    statement match {
      case v:Primitive => {
        v.dataType match {
          case p:Integral => System.out.println(String.format("%s%s %s %s", "  ".repeat(pLevel), v.level.toString(), v.name, "Int[" + p.pic+" "+p.precision+"]"))
          case p:AlphaNumeric => System.out.println(String.format("%s%s %s %s", "  ".repeat(pLevel), v.level.toString(), v.name, "AlphaNumeric[" + p.pic+" "+p.length+"]"))
          case p:Decimal => System.out.println(String.format("%s%s %s %s", "  ".repeat(pLevel), v.level.toString(), v.name, "Decimal[" + p.pic+" "+p.precision+"]"))
        }
      
      }
      case v:Group => {
        for(c <- v.children) {
          printCopyBook(c, pLevel + 1)
        }
      }
      case _ => throw new IllegalStateException("Unknown AST object encountered.")
    }
  }
}