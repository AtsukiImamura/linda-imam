
import src.main.scala.service.CopyParseService
import src.main.scala.model.CommandParseCopyBook
import java.util.Scanner
import scala.util.control.Breaks
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.CmdLineException;
object HelloWorld {
  def main(args: Array[String]): Unit = {

      val b = new Breaks
      b.breakable {
        while(true){
          System.out.println("input sth.");
          val input = new Scanner(System.in);
          val s = input.nextLine;          
          if (s.equals("break")){
              b.break;
          }
          val ct = new Breaks
          ct.breakable {
            val command = new CommandParseCopyBook();
            try {
              new CmdLineParser(command).parseArgument(s.split(" "): _*)
            }catch{ case e: CmdLineException => 
              System.out.println("1 400 CMD_LINE_EXCEPTION"); // invalid argument
              ct.break()
            }
            // System.out.println("command.method="+command.method)
            // System.out.println("command.path="+command.path)
            command.method match {
              case "parse" => {
              }
              case _ => {
                System.out.println("1 400 INVALID_METHOD"); // invalid argument
                ct.break()
              }
            }
            if(command.path == "") {
              System.out.println("1 400 INVALID_PATH"); // invalid argument
              ct.break()
            }

            val filePath = new CopyParseService().parse(command.path)
            System.out.println("0 000 OK " + filePath);
            
          }
        }  
      }
  }

}