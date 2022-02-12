A modal dialog.

TODO: Complete

## Usage

### Showing or hiding a dialog

The default property, _open_, indicates whether the dialog is visible or not:

!!! example "Page content"

    === "Markdown"

        ```
        <|{show_dialog}|dialog|>
        ```
  
    === "HTML"

        ```html
        <taipy:dialog>{show_dialog}</taipy:dialog>
        ```

### Specifying labels and actions

Several properties let you specify which label should be used for which button,
and what actions (callback functions) are triggered when buttons are pressed:

!!! example "Page content"

    === "Markdown"

        ```
        <|dialog|title=Dialog Title|open={show_dialog}|page_id=page1|validate_action=validate_action|cancel_action=cancel_action||validate_action_text=Validate|cancel_action_text=Cancel|>
        ```
  
    === "HTML"

        ```html
        <taipy:dialog
         title="Dialog Title"
         page_id="page1"
         validate_label="Validate"
         validate_action="validate_action"
         cancel_label="Cancel"
         cancel_action="cancel_action">{show_dialog}</taipy:dialog>
        ```

<|dialog|title=Dialog Title|open={value}|page_id=page1|validate_action=validate_action|cancel_action=cancel_action||validate_action_text=Validate|cancel_action_text=Cancel|>