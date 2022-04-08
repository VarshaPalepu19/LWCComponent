public with sharing class UserStories {
    public UserStories() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Userstories__c> getDetails(){
        return[
            SELECT
            Name,
            Type__c,
            Status__c
            FROM Userstories__c
        ];
    }
    @AuraEnabled
    public static List<Userstories__c> getRecordList(){
        return[
            SELECT Name,Status__c FROM Userstories__c
        ];
    }
}
