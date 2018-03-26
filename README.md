# Logger

As all good loggers do, this do one thing well: Log stuff.

All logs print to the console in this format:

LOCATION - TAG - DETAILS

Location: The location the log was created (i.e. the node module)


# Creating the Logger

Logger is an exported class. You can instanciate it like this:

```js
var Logger = require('logger');
var logger = new Logger(title);
```
|Parameter|What it do|Default|
|---------|----------|-------|
|path| Name of your logger | (Required Parameter) |

**Note:** The name of your logger is used in reports. Name it wisely.



# Logging Functions

## Log
```js
logger.log(tag <string>, detail <object>);
```
|Parameter|What it do|Default|
|---------|----------|-------|
|tag | This is the identifier for the log. It is best to name this as though it were the title of the category the log fits in to (i.e. "Deleted Items"). | (Required Parameter) |

## Error
```js
logger.error(error <error object>);
```
|Parameter|What it do|Default|
|---------|----------|-------|
|error | The error to be logged | (Required Parameter) |

## Fatal Error
```js
logger.fatalError(error <error object>);
```
|Parameter|What it do|Default|
|---------|----------|-------|
|error | The error to be logged - this one is typically used for errors you know *will* stop the process | (Required Parameter) |

## Warning
```js
logger.warning(message <string>);
```
|Parameter|What it do|Default|
|---------|----------|-------|
|message | The warning message. These are best used for things that *may* have broken, but might not be an issue. Usually to let the user know investigation is needed.| (Required Parameter) |

## Message
```js
logger.message(message <string>);
```
|Parameter|What it do|Default|
|---------|----------|-------|
|message | The message to display | (Required Parameter) |

**Note:** `logger.message` does ***NOT*** log anything. It is available so you can print to the console in the same format as the rest of the logs.

In the end, all five log types end up in the same array (`loggers.logs`). That array of logs is just sifted out and organized for the reports.

# Reports

After you've created all your beautimous logs, you can then spit them out in fancy reports. **Report Sets** can be defined beforehand - they determine what shows up in a report. For example, if you only want to spit out a report of errors, you can create a Report Set for errors only.

## JSON Report
```js
logger.jsonReport(path <string-optional>, reportSetName <string-optional>);
```

|Parameter|What it do|Default|
|---------|----------|-------|
|path| Location the report will be written to | PWD|
|reportSetName| Title of the report set you would like to build the report from | If not provided, uses all available logs |

## HTML Report
```js
logger.jsonReport(path <string-optional>, reportSetName <string-optional>);
```

|Parameter|What it do|Default|
|---------|----------|-------|
|path| Location the report will be written to | PWD|
|reportSetName| Title of the report set you would like to build the report from | If not provided, uses all available logs |

## Console Report
```js
logger.consoleReport(reportSetName <string-optional>);
```

|Parameter|What it do|Default|
|---------|----------|-------|
|path| Location the report will be written to | PWD|
|reportSetName| Title of the report set you would like to build the report from | If not provided, uses all available logs |

## Mass Reports

Alternatively, you can just log all available report sets by add "All" to the end of the function name. It will create a report for each report set created.
```js
logger.consoleReportAll();
logger.jsonReportAll();
logger.htmlReportAll();
```

## Report Sets

To create a report set:
```js
logger.createReportSet(title <string>, tags <arrayOfString>);
```

Continuing the error example:
```js
logger.createReportSet('Errors', ['error']);
```
This will generate a report using only the logs created with `logger.error(err)`.

Including more than one tag is easy:
```js
logger.createReportSet('Superheroes', ['batman', 'superman', 'spiderman', 'yourmom']);
```
This will generate a report using only the logs that include the listed superheroes.

## Default Tags

Some of the functions provide default tags:

| Function | Default Tag |
|----------|-------------|
| logger.error() | 'error' |
| logger.warning() | 'warning' |
| logger.fatalError() | 'fatalError' |

You might have guessed that, though.

## Customizing the Top Section of an HTML Report

On the HTML report, you can customize the HTML that goes in the "Header" section. Not the `<header>` tag you're thinking of, but the section above where the logs show up. To do so:

```js
logger.setHtmlHeader(htmlString <string>);
```

|Parameter|What it do|Default|
|---------|----------|-------|
|htmlString| The custom HTML you want to insert | empty string |



# Example

Let's take a look at the logger doing what it do:

```js
var Logger = require('logger');
var logger = new Logger('My Superb Title');

logger.log('ThingDid', {
    someDetail: 'So detail',
    anotherDetail: 'Much amaze',
    otherDetail: 'Many detail'
})

logger.error(new Error('This takes error objects, like your mom'));

logger.log('Wakanda', {
    Superhero: 'Black Panther',
    Sidekick: 'White Wolf'
});

logger.warning('This is just a string - not that exciting - like your mom');

logger.message('This doesn\'t actually log anything, but it does print to the console in the same format as the rest of your logs');

logger.fatalError('This just does the same thing as logger.error, but it prints it out all crazy - like your mom');

logger.createReportSet('WakandaReportYouMakin', 
    [
        'Wakanda',
        'error',
        'warning'
    ]);

// Tell me good things in the console
logger.consoleReport();

// Tell me good things with HTML
logger.htmlReport('./myAwesomeReports');

// Tell me good Wakanda things in HTML
logger.htmlReport('./myAwesomeReports', 'WakandaReportYouMakin');

// Just tell me everything you've got in JSON
logger.jsonReportAll();
```