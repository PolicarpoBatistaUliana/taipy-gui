Displays data sets in a chart or a group of charts.

The chart control is based on the [plotly.js](https://plotly.com/javascript/)
graphs library.

A chart control can hold several traces, that can display individual data sets.  

To indicate properties for a given trace, you will use the indexed properties
(using the *property_name[index]* syntax, with the indices starting at index 1) to
specify which trace you target.

Indexed properties can have a default value (using the *property_name* syntax with
no index) which is overridden by any specified indexed property.

## Usage

### Simple example

If you want to create a chart that represents a dataframe stored in the Python
variable _data_, where column "Col1" you can use the following content:

!!! example "Page content"

    === "Markdown"

        ```
        <|{data}|chart|x=xValues|y=yValues|>
        ```
  
    === "HTML"

        ```html
        <taipy:chart x="xValues" y="yValues">{data}</taipy:chart>
        ```


### Multiple charts

You may want to plot different data sets in the same chart.

In the following example, _data_ holds a data frame where two sets of values are stored
in columns _y1_ and _y2_ that you want to represent in a chart where the abscissa
values can be found in column _x_.  
Labels for the charts can be found in columns _l1_ and _l2_.

Furthermore, we want the second dataset to be displayed in red.

!!! example "Page content"

    === "Markdown"

        ```
        <|{data}|chart|x=x|y[1]=y1|label[1]=l1|y[2]=y2|label[2]=l2|color[2]=red|xaxis[2]=x2|>
        ```
  
        Note how we refer to the different y value sources, using indices.

    === "HTML"

        ```html
        <taipy:chart
         x="x"
         y[1]="y1" label[1]="l1"
         y[2]="y2" label[2]="l2"
         mode[2]="markers" color[2]="red" type[2]="scatter"
         xaxis[2]="x2">{data}</taipy:chart>
        ```

### Tracking selection

If points selection is enabled in the chart, you can keep track of which point indices
are selected in a variable.

!!! example "Page content"

    === "Markdown"

        ```
        <|{data}|chart|selected={selected_indices}|...|>
        ```

    === "HTML"

        ```html
        <taipy:chart selected="selected_indices" ...>{data}</taipy:chart>
        ```