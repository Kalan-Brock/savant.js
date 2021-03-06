# savant.js

Have you ever filled out a large form and accidently hit back, closed your tab, or even closed your browser?

savant.js solves this problem with easy to use, true form persistence.  Forms will remain as is for whatever amount of seconds you set (default 300).  You can even skip sensitive fields, such as password fields.

## Get with Bower

bower install savantjs

## Requirements

- jQuery

## Installation

Add the script inside your head tags.

```
<script src="/js/savant.min.js"></script>
```

Before your body close tag add this script.

```
<script>
	$(function(){
		$('.savant-form').savantForm({
			expiresin: 300 //number of seconds to persist (default 5 minutes)
		});
	});
</script>
```


## Usage

1.  Add the class "savant-form" to any form you wish to have persistence.
2.  Add the class "savant-skip" to any field you wish to not persist.


## License

The MIT License (MIT)

Copyright (c) 2015 Kalan Brock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


