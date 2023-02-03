import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-supplierlanding',
  templateUrl: './supplierlanding.component.html',
  styleUrls: ['./supplierlanding.component.css']
})
export class SupplierlandingComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }


}
