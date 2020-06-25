import {Component, Inject, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {DOCUMENT} from "@angular/common";
import {ProduitService} from "../../service/produit.service";
import {Produit} from "../../models/produit";
import {element} from "protractor";
function generateRandomColor()
{
  var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
  //random color will be freshly served
}
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,private produitService:ProduitService) { }
  libelleProduit:String[]=[];
  demande:string[]=[];
  produits:Produit[];
  data:number[]=[];
  spinner:boolean=true;
  colors:string[]=[];
  ngOnInit(): void {
    var yLabels = {
       25: 'faible', 50:'moyenne', 75: 'forte',
    }
    this._document.body.style.background="#e7dfd5";
    this.produitService.findAll().subscribe(data=>{
      this.produits = <Produit[]> data;
      this.produits.forEach(element =>{
        this.libelleProduit.push(element.libelle);
        this.colors.push(generateRandomColor());
              });
      //console.log(this.demande);
      this.produits.forEach(element=>{
        this.produitService.demande(element).subscribe(data=>{
          console.log(data);
        },error => {
          this.demande.push(error.error.text) ;
          if(error.error.text == 'faible'){
            this.data.push(25);
          }else if(error.error.text == 'moyenne'){
            this.data.push(50);
          }else{
            this.data.push(75);
          }
        })
      });
      setTimeout(()=>{
      this.spinner = false;
        let myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: this.libelleProduit,
            datasets: [{
              data: this.data,
              backgroundColor: this.colors,
              borderColor:this.colors
              ,
              borderWidth: 1
            }]
          },
          options: {
            title: {
              display: true,
              text: 'la demande des produits',
              fontSize:25,
              fontColor:'#07031a'
            },
            legend: {
              display: false
            },
            scales: {
              xAxes:[{
                scaleLabel: {
                  display: true,
                  labelString: 'Produits',
                  fontSize: 25
                }
              }],
              yAxes: [{
                id: 'first-y-axis',
                type: 'linear',
                scaleLabel: {
                  display: true,
                  labelString: 'demande',
                  fontSize: 25
                },
                ticks: {
                  display:true,
                  callback: function(value, index, values) {
                    return yLabels[value];
                  }
                }
              }]
            }
          }
        });
      }, 2000);


    });



  }

}
