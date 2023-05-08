import * as cp from "child_process"

console.log(process.cwd())

const java = cp.spawn( 'java', ['-jar',process.cwd()+'\\target\\scala-2.12\\linda-imam-assembly-1.0.jar'],{stdio:[ 'pipe',null,null, 'pipe' ]});

//受信するたびに、内容を返す
java.stdout.on('data', function(data){
    //toString()を使わないと、バイナリのバッファー内容が返される
    console.log("[java]"+data.toString());
});

// let intCnt = 0
// setInterval(function () {
//     //送信内容は必ず"\n"で終わらせる
//     console.log("hello -->")
//     java.stdin.write("Hello\n");
//     intCnt ++;
//     if (intCnt > 3){
//        java.stdin.write("break\n");
//     }
// },2000);
