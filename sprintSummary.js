import { LightningElement, wire, track } from 'lwc';
import getDetails from '@salesforce/apex/UserStories.getRecordList';
export default class SprintSummary extends LightningElement {
    //@track item;
    @track records;
    @track completedRecords;
    @track onholdRecords;
    @track errors;
    @track total;
    @track completedTotal;
    @track onholdTotal;
    @track color;
    @track perc;
    @track Status__c;
    @track Userstories__c;
    @track inprogress;
    @track picked;
    //@wire(getDetails)
    connectedCallback() {
        console.log("connected callback");
        this.getRecords();
        //this.colorcode();

    }
    getRecords() {

        getDetails()
            .then(result => {
                this.records = result;

               this.total= this.records.length;
               console.log(this.total);
                this.completedRecords = this.records.filter(i => i.Status__c=="Completed");
                this.completedTotal=this.completedRecords.length;
                console.log(this.completedTotal);
                this.onholdRecords=this.records.filter(n => n.Status__c=="Onhold");
                this.onholdTotal=this.onholdRecords.length;
                console.log(this.onholdTotal);
                this.inprogress=this.records.filter(n => n.Status__c=="In Progress");
                this.inProgressTotal=this.inprogress.length;
                console.log(this.inProgressTotal);
                this.picked=this.records.filter(n => n.Status__c=="Picked");
                this.pickedTotal=this.picked.length;
                console.log(this.pickedTotal);
                //this.perc=this.completedTotal/this.total *100;
                //console.log(this.perc);

            }
            )
            .catch(error => {
                this.errors = error;
            });
        
        //console.log("filter");
    }
     get colorcode(){
        this.perc=this.completedTotal/this.total *100;
        if( this.perc<=60){
            return this.color="RED";
        }
        else if(this.perc>70 && this.perc<90 && this.onholdTotal==0){
            return this.color="ORANGE";
        }
        else if(this.perc>90){
            return this.color="GREEN";
        }
        else if(this.onholdTotal!=0){
            return this.color="RED";
        }
      

    }
}
