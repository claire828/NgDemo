import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {TaskManagerService} from '../task-manager.service';
import {Page, IItemStruct} from '../def/defTask';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  readonly PAGE_COUNT:number = 5;
  readonly DAFAULTMSG:string="What needs to be done?";
  defaultInput:string =  this.DAFAULTMSG;
  currentPage:Page = Page.ALL;
  currentPageCount:number = 1;

  constructor(public taskService:TaskManagerService, private apollo: Apollo ) { }

  ngOnInit(): void {
  }
  onFocus():void{
    this.defaultInput = "";
  }

  resetDefaultInput(){
    this.defaultInput = this.DAFAULTMSG;
  }
  onFocusOutEvent(event: any){
    this.resetDefaultInput();
  }

  onChangeAllStatus():void{
    this.taskService.completeAllTasks(!this.IsAllComplete);
  }

  onDeleteCompleteTask():void{
    this.taskService.removeAllCompleteTask();
  }

  save(event: any) {
    if(!event.target.value) return;
    this.taskService.addItem(event.target.value);
    this.resetDefaultInput();
  }

  onbtnRemoveAllCompletedTasks(){
    this.taskService.removeAllCompleteTask();
  }

  onSelect(page:Page){
    this.currentPage = page;
    this.forceResetPage(1);
  }

  getTaskListByPage(page:Page):IItemStruct[]{
    switch(page){
        case Page.ALL:
        return this.taskService.List;
        case Page.ACTIVE:
        case Page.COMPLETE:
          let complete = page == Page.COMPLETE ?? false;
          return this.taskService.List.filter(x=>x.complete === complete);
        default:
            break;
    }
    return[];
  }

  get PreciseList():IItemStruct[]{
    let temp = [...this.getTaskListByPage(this.currentPage)];
    let startInx = 5 * (this.currentPageCount -1);
    let endInx = this.currentPageCount * this.PAGE_COUNT;
    temp = temp.slice(startInx, endInx);
    return temp
  }

  get PreciseListCount():number{
    return this.PreciseList.length;
  }


  get Icon():string{
    return this.HasTask ? "❯" : " ";
  }
  get TaskCount():number{
    return this.taskService.List.length;
  }

  get LeftMsg():string{
    const mutiple = this.ActivedTaskCount>1 ? "s" : "";
    return `${this.ActivedTaskCount} item${mutiple} left`
  }
  get HasTask():boolean{
    return this.TaskCount>0;
  }

  get ActivedTaskCount():number{
    return this.taskService.List.filter(x=>x.complete === false).length;
  }

  get IsAllComplete():boolean{
    if(!this.HasTask) return true;
    if(this.taskService.List.find(x=>x.complete === false)) return false;
    return true;
  }

  get HasTickedYet():boolean{
    if( this.taskService.List.find(x=>x.complete === true)) return true;
    return false;
  }


  
  get TotalPage():number{
    const count = this.getTaskListByPage(this.currentPage).length;
    if(count <=5) return 1;
    const extra = count% this.PAGE_COUNT !=0 ? 1 : 0;
    let pageCount:number = +Math.floor((count) / this.PAGE_COUNT);
    return pageCount + extra;
  }

  resetPage(increase:boolean){
    const newPage = increase ? this.currentPageCount+ 1 : this.currentPageCount-1;
    if(newPage < 0 || newPage >this.TotalPage ) return;
    this.currentPageCount = newPage;
  }

  forceResetPage(newPage:number){
    if(newPage < 0 || newPage >this.TotalPage ) return;
    this.currentPageCount = newPage;
  }

  get ShowPre():boolean{
    return this.currentPageCount>1 && this.TotalPage>1;
  }

  get ShowNext():boolean{
    return this.currentPageCount<this.TotalPage && this.TotalPage>1;
  }

}


