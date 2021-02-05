
import {IItemStruct} from '../def/defTask'


export class TaskDB{

    todoList:IItemStruct[];
    constructor(){
        this.todoList = [];
    }

    insertAllData(list:any[]){
       this.todoList = [];
       list.forEach(x=>{
            let task:IItemStruct = {
                uuid:x.uuid,
                name:x.name,
                complete:Boolean(x.status),
                isFocus:false,
                isRemove:false
            }
            this.addTask(task);
        });
    }

    addTask(task:IItemStruct){
        this.todoList.push(task);
    }


    getTask(id:string):IItemStruct{
        return this.todoList.find(x=>x.uuid === id);
    }

    resetListAfterRemoving(){
        this.todoList = this.todoList.filter(x=>!x.isRemove);
    }

    completeAllTasks(complete:boolean){
        this.todoList.map(x=>x.complete = complete);
    }

}