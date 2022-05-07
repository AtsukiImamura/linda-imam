package src.main.scala.model;

import org.kohsuke.args4j.Option;
import org.kohsuke.args4j.Argument;

class CommandParseCopyBook {   

    @Argument(index = 0, metaVar = "method", required = true, usage = "Method")
    var method: String = ""


    @Option(name = "-p") 
    var path: String = ""
}