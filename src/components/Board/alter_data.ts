import { ITODO } from "../../Store/API_Service/TODO_API"

interface IChildItems {
    id: string,
    content: string
    title: string
}
interface IRootEmelemt {
    title: string,
    items: IChildItems[]
}



export const alterData = (respo: ITODO[]) => {

    var defaultobj = { "lists": [{ "title": "todo", "items": [] }, { "title": "doing", "items": [] }, { "title": "done", "items": [] }] }
    interface Lists {
        title: string
        items: {
            id: string
            content: string
        }[]
    }

    let newList: Lists[] = [];

    let statarray = ["todo", "doing", "done"]
    statarray.map((status) => {
        let obj: any = defaultobj.lists.filter(x => x.title == status)

        let array: any[] = [];
        let respResult = respo.filter(resp => resp.status == status)
        respResult.map((todo) => {
            array.push({ id: todo.id, content: todo.description, title: todo.title })
        })


        obj = { ...obj[0], items: array }
        newList.push(obj)

    })

    return { "lists": newList }
}
