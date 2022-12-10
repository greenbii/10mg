import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialsComponent implements OnInit {

  testimonies = [
    {
      testimony: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation.",
      name: "John Doe",
      description: "Description"
    },
    {
      testimony: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation.",
      name: "Jane Doe",
      description: "Description"
    },
    {
      testimony: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation.",
      name: "Jake Doe",
      description: "Description"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
