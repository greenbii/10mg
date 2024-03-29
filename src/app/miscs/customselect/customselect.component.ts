import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-customselect',
  templateUrl: './customselect.component.html',
  styleUrls: ['./customselect.component.css']
})
export class CustomselectComponent implements OnInit {

  @Input() listItems: any[] = [];
  @Input() selectedItem: any = null;
  @Input() labelText: string = "Select Item"
  @Input() placeholderText: string = "Select Item";
  @Input() allowCreateNew: boolean = false;
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() listItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() allowCreateNewChange: EventEmitter<boolean> = new EventEmitter<boolean>(false)
  @Input() inputType: string = 'text';
  @Input() removeDuplicates: boolean = false;

  show_list: boolean = false;

  @Input() textInput: any = null;
  @Output() textInputChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    //this.listItemsChange.asObservable().subscribe()
  }

  handleSelectedItem(item: any) {
    this.selectedItem = item;
    this.triggerSelected();
  }

  handleEnterKeypress() {
    if(this.allowCreateNew) {
      //add the newly entered item to the list
      if(this.textInput !== null && this.textInput.toString().trim().length !== 0) {
        //add the item
        if(this.checkItemExistsInList()) {
          const iIndex = this.listItems.findIndex((ff)=> ff.label.toString().toLowerCase().trim() === this.textInput.toString().toLowerCase().trim())
          this.handleSelectedItem(this.listItems[iIndex]);
          this.show_list = false;
          return;
        }
        const new_item = {label: this.textInput, value: this.textInput, __isNew__: true}
        this.listItems.push(JSON.parse(JSON.stringify(new_item)))
        this.listItemsChange.emit(this.listItems);
        this.handleSelectedItem(new_item)
        this.allowCreateNewChange.emit(true);
      }
    }
  }

  checkItemExistsInList(): boolean {
    return this.textInput !== null && this.textInput.toString().trim().length !== 0 && this.listItems.findIndex((ff)=> ff.label.toString().toLowerCase().trim() === this.textInput.toString().toLowerCase().trim()) !== -1
  }

  triggerSelected() {
    this.textInput = this.selectedItem.label
    this.selectedItemChange.emit(this.selectedItem);
    //this.listItemsChange.emit(this.listItems);
    this.show_list = false;
  }

  handleHideList() {
    this.handleEnterKeypress();
    setTimeout((
    )=>{
      this.show_list = false
    }, 300)
  }

  capitalize(s: string | number) {
    const ss = s.toString();
    const first_letter = ss.charAt(0);
    let rt = s;
    if(parseInt(first_letter+"") !== 0) {
      //means its a number
      //return value as it is
      rt = s;
    }
    else {
      rt = ss.charAt(0).toUpperCase()+ss.substring(1).toLowerCase()
    }

    return rt;
  }
  


}
