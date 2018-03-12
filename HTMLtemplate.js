module.exports = (course) => `
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${course.info.fileName.split('.zip')[0]} Conversion Report</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">



        <style>
            :root {
                --color-1: #0076c6;
                --color-2: #222222;
                --color-3: #F58300;
            }

            body {
                padding: 20px 10%;
                margin: 0;
            }

            a {
                color: var(--color-1);
                transition: .07s all;
            }

            a:hover {
                color: var(--color-3);
            }

            .card {
                padding: 20px;
            }

            .header1 {
                font-size: 32px;
                font-weight: bold;
            }

            .header2 {
                font-size: 20px;
            }

            .header3 {
                font-size: 14px;
            }

            .collapsible-header {
                font-weight: bold;
            }

            @media (max-width: 1400px) {
                body {
                    padding: 20px 20px;
                }
            }

        </style>
        <script>


        </script>
    </head>

    <body>

        <div class="card">
            <div>
                <span class="header1">Brightspace</span>
                <span class="header1 right">Canvas</span>
            </div>
            <div>
                <span class="header3">Course OU: ${course.info.D2LOU}</span>
                <span class="header3 right">Course ID: ${course.info.canvasOU}</span>
            </div>
            <div>
                <a target="_blank" href="https://byui.brightspace.com/d2l/home/${course.info.D2LOU}">https://byui.brightspace.com/d2l/home/${course.info.D2LOU}</a>
                <a target="_blank" href="https://byui.instructure.com/courses/${course.info.canvasOU}" class="right">https://byui.instructure.com/courses/${course.info.canvasOU}</a>
            </div>
        </div>

        <div class="card">
            <div class="header1">
                Changes
            </div>
            <ul class="collapsible" data-collapsible="accordion">
                ${course.info.htmlReportGuts}
            </ul>

        </div>

        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-alpha.4/css/materialize.min.css">
        <!-- Compiled and minified JavaScript -->
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
    </body>

</html>`;
