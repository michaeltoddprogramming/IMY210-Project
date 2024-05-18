<?xml version="1.0" encoding="UTF-8" ?>
<!-- Michael Todd u23540223 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
    <xsl:template match="/">
        <fo:root>
            <fo:layout-master-set>
                <fo:simple-page-master master-name="simple" page-height="29.7cm" page-width="21cm" margin="2cm">
                    <fo:region-body/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="simple">
                <fo:flow flow-name="xsl-region-body">
                    <fo:block font-size="24pt" font-weight="bold" space-after="24pt" text-align="center">
                        <xsl:value-of select="store/information/name"/>
                    </fo:block>
                    <fo:block font-size="14pt" space-after="18pt" text-align="center">
                        <fo:inline></fo:inline> <xsl:value-of select="store/information/description"/>
                    </fo:block>
                    <fo:block font-size="18pt" font-weight="bold" space-after="18pt" text-align="center">
                        Owner
                    </fo:block>
                    <fo:block font-size="14pt" space-after="18pt" text-align="center">
                        <fo:inline font-weight="bold"></fo:inline> <xsl:value-of select="store/information/owner"/>
                    </fo:block>
                    <fo:block font-size="18pt" font-weight="bold" space-after="18pt" text-align="left">
                        Products
                    </fo:block>
                    <xsl:for-each select="store/products/product">
                        <fo:block font-size="18pt" font-weight="bold" space-after="18pt" text-align="center">
                            <xsl:value-of select="title"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Author - </fo:inline> <xsl:value-of select="author"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">ISBN - </fo:inline> <xsl:value-of select="isbn"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">SKU - </fo:inline> <xsl:value-of select="sku"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Description - </fo:inline> <xsl:value-of select="description"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Price - </fo:inline>R<xsl:value-of select="price"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Department - </fo:inline> <xsl:value-of select="department"/>
                        </fo:block>
                        <xsl:for-each select="modules/module">
                            <fo:block font-size="14pt" space-after="12pt">
                                <fo:inline font-weight="bold">Module Name - </fo:inline><xsl:value-of select="@name"/>
                            </fo:block>
                        </xsl:for-each>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Availability - </fo:inline> <xsl:value-of select="availability"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Condition - </fo:inline> <xsl:value-of select="condition"/>
                        </fo:block>
                        <fo:block font-size="14pt" space-after="12pt">
                            <fo:inline font-weight="bold">Image - </fo:inline> <xsl:value-of select="image"/>
                        </fo:block>
                        <fo:block space-after="24pt"/>
                    </xsl:for-each>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>
</xsl:stylesheet>