var Font = function(font) {
    this.family = font.family;
    this.variants = font.variants;
    this.variantString = this.variants.join(", ").replace("regular", "400").replace("italic", "400italic");
    this.url = "http://fonts.googleapis.com/css?family=" + this.family + ":" + this.variantString;
    this.quickUseUrl = "https://www.google.com/fonts#UsePlace:use/Collection:" + this.family.replace(" ", "+");
    this.category = font.category;
}