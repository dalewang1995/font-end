// 快速排序

let arr = [10,12,21,8,100,29,31,7,100,61,5]

function quickSort(list){
    if(list.length<=1){
        return list
    }
    let midIndex = Math.floor(list.length / 2)
    let midVal = list.splice(midIndex, 1)[0]

    let leftArr = []
    let rightArr = []
    for(let i = 0; i<=list.length -1; i++){
        if(list[i]<=midVal){
            leftArr.push(list[i])
        }else{
            rightArr.push(list[i])
        }
    }
    let res = quickSort(leftArr).concat(midVal, quickSort(rightArr))
    console.log(res)
    return res
}

quickSort(arr)