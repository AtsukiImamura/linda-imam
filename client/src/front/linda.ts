declare var window: any;
console.log("hello world! --1");
(window as any).addEventListener('DOMContentLoaded', () => {
    console.log("hello world!")
})

