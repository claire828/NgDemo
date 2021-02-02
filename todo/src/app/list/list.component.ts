import { Component, OnInit, Input } from '@angular/core';
import {IItemStruct} from '../item/item.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  readonly DAFAULTMSG:string="What needs to be done?";
  defaultInput:string =  this.DAFAULTMSG;
  todoList:IItemStruct[] = [];
  isFolded:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  addItem(name:string):void{
    let task:IItemStruct = {
      name,
      complete:false
    }
    this.todoList.push(task);
  }

  foldList():void{
    this.isFolded = !this.isFolded;
  }

  onAllComplete():void{
    // TODO send to the server that all task are completed.
    // and then clear all todoList
    this.todoList = [];
  }

  onFocus():void{
    this.defaultInput = "";
  }

  onFocusOutEvent(event: any){
    this.defaultInput = this.DAFAULTMSG;
  }

  save(event: any) {
    if(!event.target.value) return;
    this.addItem(event.target.value);
  }

  getIcon():string{
    return this.todoList.length>0 ? "❯" : "";
  }

 
  //TODO 將任務儲存到服務中，子層級要通知母層級，最後當此完成則陣列資料才是真正的連動
}


