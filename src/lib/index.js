//   // функция для преобразование в ассоциативный массив
// const useFunction = (dataAnswer) => {

//     const parseArray = () => {
//         let dataArray = new Map();
//         if(typeof(dataArray) === 'object'){
//             console.log(dataArray);
//             dataArray.dataAnswer.forEach((item)=>{
//                 dataArray.set(item.name_rus,Number(item.count))
//             })
//         }
//     }

//     return {parseArray}
// }

// export default useFunction; 
const parseArray = (dataAnswer) => {
    let dataArray = new Map();
    console.log(dataAnswer);
    if(typeof(dataAnswer) === 'object'){
        // dataAnswer.forEach((item)=>{
        //     dataArray.set(item.name_rus,Number(item.count))
        // })
    }
}
export default parseArray; 
