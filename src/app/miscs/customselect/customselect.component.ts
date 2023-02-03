import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customselect',
  templateUrl: './customselect.component.html',
  styleUrls: ['./customselect.component.css']
})
export class CustomselectComponent implements OnInit {

  @Input() listItems: any[] = [
    {label: "Rice", value: "v"},
    {label: "Beans", value: "b"},
    {label: "Yam", value: "y"}
  ];
  @Input() selectedItem: any = null;
  @Input() labelText: string = "Select Item"
  @Input() placeholderText: string = "Select Item";
  @Input() allowCreateNew: boolean = false;
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();

  show_list: boolean = false;

  textInput: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  handleSelectedItem(item: any) {
    this.selectedItem = item;
    this.triggerSelected();
  }

  handleEnterKeypress() {
    if(this.allowCreateNew) {
      //add the newly entered item to the list
      if(this.textInput !== null && this.textInput.trim().length !== 0) {
        //add the item
        this.listItems.push(JSON.parse(JSON.stringify({label: this.textInput, value: this.textInput, __isNew__: true})))
      }
    }
  }

  triggerSelected() {
    this.textInput = this.selectedItem.label
    this.selectedItemChange.emit(this.selectedItem);
    this.show_list = false;
  }

}
