A control that can display and specified a formatted date, with or without time.

## Usage

### Using the full date and time

Assuming a variable _dt_ contains a Python `datetime` object, you can create
a date selector that represents it:

!!! example "Page content"

    === "Markdown"

        ```
        <|{dt}|date_selector|>
        ```
  
    === "HTML"

        ```html
        <taipy:date_selector>{dt}</taipy:date_selector>
        ```

### Using only the date

If you don't need to use the date, you can do so:

!!! example "Page content"

    === "Markdown"

        ```
        <|{dt}|date_selector|not with_time|>
        ```
  
    === "HTML"

        ```html
        <taipy:date_selector with_time="false">{dt}</taipy:date_selector>
        ```

