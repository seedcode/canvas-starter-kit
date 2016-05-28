global with sharing class AlternateResource {
    public String getResourcePath(){
        String v = cnvstart__alternateJavascript__c.getInstance().cnvstart__Resource_Name__c;
        String pre = '';
        if (v==null){
            v = 'canvasStatic';
            pre = '';
        }
        Long ts = getResourceStamp(v);
        if (ts==null){
            v = 'canvasStatic';
            pre = '';
            ts = getResourceStamp(v);
        }
        return '/resource/' + ts + '/'+ pre + v;
    }
    @TestVisible
    private Long getResourceStamp(String r){
        if(r==null){
            return null;
        }
        else{
            List<StaticResource> resourceList= [SELECT SystemModStamp FROM StaticResource WHERE Name = :r];
            return resourceList[0].systemModStamp.getTime();
        }
    }
}
