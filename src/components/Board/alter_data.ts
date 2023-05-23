import { ITODO } from "../../Store/API_Service/TODO_API"

interface IChildItems {
    id: string,
    content: string
    title: string
}
interface IRootEmelemt {
    status: string,
    items: IChildItems[]
}



export const alterData = (respo: ITODO[]) => {


    var defaultobj = { "lists": [{ "status": "todo", "items": [] }, { "status": "doing", "items": [] }, { "status": "done", "items": [] }] }
    interface Lists {
        status: string
        title: string
        items: {
            id: string
            content: string
        }[]
    }

    let newList: Lists[] = [];

    let statarray = ["todo", "doing", "done"]
    statarray.map((status) => {
        let obj: any = defaultobj.lists.filter(x => x.status == status)

        let array: any[] = [];
        let respResult = respo.filter(resp => resp.status == status)
        respResult.sort(function (a, b) {
            return a.list_position - b.list_position;
        });

        console.log("Order by srespResult", respResult)

        respResult.map((todo) => {
            array.push({ id: todo.id, content: todo.title, title: todo.description, status: todo.status })
        })


        obj = { ...obj[0], items: array }
        newList.push(obj)

    })

    return { "lists": newList }
}
