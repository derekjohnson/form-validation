# Accessible frontend form validation

Lightweight (1.1kb minified) script that adds inline errors when invalid fields receive the `blur` event and, if you use the suggested HTML & CSS, confirmation when a field is valid by putting a green tick after the label.

## Usage

```
<script>
  FormValidation(document.querySelector('form'), {
    selector: '.form__control',
    submitMessage: '.js-form-alert',
    messageInvalidEmail: 'That looks like an invalid email address',
    messageInvalidPassword: 'That looks like an invalid email address',
    messageSummaryMultiple: 'Some form fields need corrected, please review the form.',
    messageSummarySingle: 'A form field needs corrected, please review the form.'
  })
</script>
```

That may need wrapped in a `DOMContentLoaded` event listener like so:

```
<script>
  document.addEventListener('DOMContentLoaded', function() {
    FormValidation(document.querySelector('form'), {
      selector: '.form__control',
      submitMessage: '.js-form-alert',
      messageInvalidEmail: 'That looks like an invalid email address',
      messageInvalidPassword: 'That looks like an invalid email address',
      messageSummaryMultiple: 'Some form fields need corrected, please review the form.',
      messageSummarySingle: 'A form field needs corrected, please review the form.'
    })
  });
</script>
```

The example above shows all the available options. Their descriptions are:

<dl>
<dt>`selector`</dt>
<dd>A CSS selector that is common to all the form fields to be validated</dd>

<dt>`submitMessage`</dt>
<dd>A CSS selector for an element that displays a message when a form is submitted with one or more invalid fields</dd>

<dt>`messageInvalidEmail`</dt>
<dd>The inline message to display when an `input type="email"` is not empty but invalid.

<dt>`messageInvalidPassword`</dt>
<dd>The inline message to display when an `input type="password"` in not empty but does not meet the condition set in `pattern`, `minlength` etc.

<dt>`messageSummaryMultiple`</dt>
<dd>A message to display when an attempt is made to submit a form with multiple invalid fields</dd>

<dt>`messageSummarySingle`</dt>
<dd>A message to display when an attempt is made to submit a form with a single invalid field</dd>

### HTML

- The `form` element must have the `novalidate` boolean attribute for this script to work.
- A `span` element should be placed after the `label`/`input` combo with an `id` attribute for `aria-describedby` to hook into.

An example HTML structure is as follows:

```
<form class="form" novalidate>
  <div class="form__group">
    <input type="text" name="name" id="name" required="required" class="form__control">
    <label class="form__label" for="name">Name</label>
    <span class="form__error" aria-live="assertive" id="name-error"></span>
  </div>
  <!-- rest of form -->
</form>
```

The `input` coming before the `label` in the source isn't necessary, it's only so the CSS to show the valid confirmation tick works.

### Opinionated example CSS

```
.form__group {
  padding-top: 1.25em;
  position: relative;
}

.form__label {
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: 0.125em;
}

.form__control {
  border: 1px solid #ddd;
  width: 100%;
  margin-bottom: 1em;
}

.form__control:not([type=checkbox]):valid:not(:focus)+label::after {
  content: " ✓";
  color: #048500;
}

.form__control:not([type=checkbox]):valid:not(:focus)~[aria-live] {
  display: none;
}

@supports (display:flex) {
  .form__group {
    display: flex;
    flex-flow: column nowrap;
    padding: 0;
  }

  .form__label {
    position: static;
    order: -1;
  }
}
```
