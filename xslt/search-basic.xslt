<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:fo="http://www.w3.org/1999/XSL/Format">    
    <xsl:template match="//system-page">
        <page>
            <title><xsl:value-of select="title"/></title>
            <!-- 
              we need to include the system-asset tags here so Cascade writes a linkable path: 
              external: "../blogs/page.html" 
              internal: "/entity/open.act?type=page&id=448d21540a00024e124399789dfd7101&confId=d1776d360a00016c5e4c03d48ab76feb" 
              and NOT this: "/blogs/page" 
            -->
            <path>[system-asset]<xsl:value-of select="path"/>[/system-asset]</path>
            <keywords><xsl:value-of select="keywords"/></keywords>
        </page>
    </xsl:template>
</xsl:stylesheet>