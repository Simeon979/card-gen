# Credit Card Generator

![version badge](https://img.shields.io/badge/dynamic/json?color=success&label=version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FSimeon979%2Fcard-gen%2Fmaster%2Fpackage.json)

## API

<dl>
<dt><a href="#generateCard">generateCard(option)</a></dt>
<dd><p>Generate a valid card either randomly or according to  supplied options </p>
<p>If startsWith is provided as an option, endsWith, includeSequence, network and issuer are ignored
If includeSequence is provided, endsWith, network and issuer are ignored
If endsWith is provided, network and issuer are ignored
network and issuer can both be provided, or be present independently</p>
</dd>
<dt><a href="#lookupCard">lookupCard(bin)</a> ⇒ <code>Object</code> | <code>undefined</code></dt>
<dd><p>Look up information about the BIN of a card and returns an object containing the  network and an optional issuer if found or undefined if not found</p>
</dd>
<dt><a href="#computeCheck">computeCheck(card)</a> ⇒ <code>number</code></dt>
<dd><p>Compute the check digit of a number according to the Luhn algorithm</p>
</dd>
<dt><a href="#validate">validate(card)</a> ⇒ <code>boolean</code></dt>
<dd><p>Validate that a number passes the Luhn check algorithm</p>
</dd>
</dl>

<a name="generateCard"></a>

## generateCard(option)
Generate a valid card either randomly or according to  supplied options 

If startsWith is provided as an option, endsWith, includeSequence, network and issuer are ignored
If includeSequence is provided, endsWith, network and issuer are ignored
If endsWith is provided, network and issuer are ignored
network and issuer can both be provided, or be present independently

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>object</code> | options to fine tune the generated card |
| option.startsWith | <code>string</code> \| <code>number</code> | a sequence of digit between 1 - 10 in length to start the generated card with |
| option.endsWith | <code>string</code> \| <code>number</code> | a sequence of digit between 1 - 10 in length to end` the generated card with |
| option.includeSequence | <code>string</code> \| <code>number</code> | a sequence of digit between 1 - 10 in length to end` the generated card with |
| option.network | <code>string</code> | the network of the card to generate |
| option.issuer | <code>string</code> | the issuer code of the generated card |
| option.verve | <code>boolean</code> | Generate a verve credit card |

<a name="lookupCard"></a>

## lookupCard(bin) ⇒ <code>Object</code> \| <code>undefined</code>
Look up information about the BIN of a card and returns an object containing the  network and an optional issuer if found or undefined if not found

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| bin | <code>string</code> \| <code>number</code> | the card  to lookup |

<a name="computeCheck"></a>

## computeCheck(card) ⇒ <code>number</code>
Compute the check digit of a number according to the Luhn algorithm

**Kind**: global function  
**Returns**: <code>number</code> - the check digit  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>string</code> \| <code>number</code> | the sequence of number to generate a check digit for according to the Luhn algorithm |

<a name="validate"></a>

## validate(card) ⇒ <code>boolean</code>
Validate that a number passes the Luhn check algorithm

**Kind**: global function  
**Returns**: <code>boolean</code> - the validity of provided number  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>string</code> \| <code>number</code> | the sequence of number to validate |

