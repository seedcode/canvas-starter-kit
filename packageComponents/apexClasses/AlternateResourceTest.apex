@istest
class AlternateResourceTest {
    @isTest static void testController() {
        Long ts, tss;
        AlternateResource jsr = new AlternateResource();
        String v = cnvstart__alternateJavascript__c.getInstance().cnvstart__Resource_Name__c;
        String pre = '';
        System.debug(v);
        if (v==null){ //if no alternate resource specified, use stock resource
            tss = jsr.getResourceStamp(v);
            System.assertEquals(tss, null);
            v = 'canvasStatic';
            pre = 'cnvstart__';
        }
        List<StaticResource> resourceList= [SELECT SystemModStamp FROM StaticResource WHERE Name = :v];
        ts = resourceList[0].systemModStamp.getTime();
        System.debug(ts);
        tss = jsr.getResourceStamp(v);
        System.debug(tss);
        System.assertEquals(ts, tss);
        if (resourceList[0]==null){ //if specified resource is not found then fall back to stock values
             v = 'canvasStatic';
             pre = 'cnvstart__';
            resourceList= [SELECT SystemModStamp FROM StaticResource WHERE Name = :v];
            System.debug(resourceList);
        }
        ts = resourceList[0].systemModStamp.getTime();
        System.debug(ts);
        tss = jsr.getResourceStamp(v);
        System.debug(tss);
        System.assertEquals(ts, tss);
        v = '/resource/' + ts + '/' + pre + v;
        System.debug(v);
        String tv = jsr.getResourcePath();
        System.assertEquals(v, tv);
    }
}
