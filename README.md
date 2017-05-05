DateTimePicker
=============


## Description

An intuitive, beautiful and simple date & time picker for Mendix.
Allows users to insert date and time through a text-input, date picker and time scroller.

## Features and limitations

- Date and time input through a dropdown or inline element.
- Does not take locales into account.

## Dependencies

- [Mendix 6.x Environment](https://appstore.mendix.com/).
- [jQuery](http://jquery.com/download/) (unminified, added to the package)
- [bootstrap-datetimepicker](http://eonasdan.github.io/bootstrap-datetimepicker/) 
- [moment.js](https://github.com/moment/moment)

## Configuration

Add the .mpk in dist to your project or build it yourself using:

```
gulp compress
```

Add the widget to a dataview and select the date attribute that you want to store the result in.
Run your project.

## Properties

- Attribute: the attribute of the data view entity that holds the date-time to present/input.
- Format: the format that you want to use to display the date time
- Today button: if true, a today button is rendered in the widget's toolbar
- Close button: if true and widget is not inline, will render a close button to hide the date-time picker
- Clear button: if true, a clear button is rendered in the widget's toolbar
- Show inline: if true, the widget will not show an input field but render the date-time picker inline.
- Side by side: if true, date and time picker are shown side by side.
- Step: the number of minutes to step with the minute scrollwheel.

