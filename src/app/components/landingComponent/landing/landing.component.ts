import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  busIcon: string  = "fa-solid fa-bus"
  userIcon: string = "fa-solid fa-circle-user"
  warrantyIcon: string = "fa-solid fa-award"
  cartIcon: string = "fa-solid fa-cart-shopping"

  contents = [
    {
      icon: this.busIcon,
      title: "Free Shipping",
      details: "Handling time 1 - 3 business days. Estimated delievry between 7 - 14 bsiness days to most countries."
    },
    {
      icon: this.userIcon,
      title: "24/7 Support",
      details: "If you have a question or problem, we will be there. We have a 100% same-day response rate, including weekends and public holidays, all year round."
    },
    {
      icon: this.warrantyIcon,
      title: "30 Day Warranty",
      details: "We promise you a hassle free experience. For up to 30 days after receiving your order, if you have a problem with your products, we will take care of it."
    },
    {
      icon: this.cartIcon,
      title: "Secure Checkout",
      details: "Pay with the world's most popular and secure payment methods including PayPal. We also have strict strick policies to protect all customers related information."
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
