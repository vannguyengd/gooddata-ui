import { SiteChecker } from "broken-link-checker";

const CONSOLE_RED = "\x1b[31m";
const CONSOLE_GREEN = "\x1b[32m";
const CONSOLE_WHITE = "\x1b[37m";

let totalLinksCount = 0;
let brokenLinksCount = 0;

const EXCLUDE_ERRORS = [
    "ERRNO_EPROTO", // skip https://localhost:3000 links errors
    "HTTP_undefined", // skip https://localhost:3000 links errors (this error is likely some unhandled HTTP exception of the broken-link-checker)
    "HTTP_403", // skip GoodData help links unauthorized errors (HTTP_403 === page still exists, broken help links throw HTTP_404 error)
];

// Reason to list here all the unsupported versions is that broken-link-checker does not support regular expressions very well
const EXCLUDE_VERSIONS = [
    // Skip versions that are out of support
    "7.8.0",
    "7.7.0",
    "7.6.0",
    "7.5.0",
    "7.4.0",
    "7.3.0",
    "7.2.0",
    "7.1.0",
    "7.0.0",
    "6.3.0",
    "6.2.0",
    "6.1.0",
    "6.0.0",
    "5.3.0",
    "5.2.0",
    "5.1.0",
    "5.0.0",
    "4.1.1",
];

const EXCLUDE_KEYWORDS = [
    // These pages/links are still accessible in 7.9 docs, but not relevant anymore
    "migration_guide_5",
    "https://github.com/gooddata/ui-sdk-examples/blob/vanillajs/vanillajs/create-bundle/vanilla.js",
];

const htmlChecker = new SiteChecker(
    {
        excludedKeywords: [...EXCLUDE_VERSIONS, ...EXCLUDE_KEYWORDS],
    },
    {
        link: (result) => {
            totalLinksCount += 1;

            if (
                result.broken &&
                EXCLUDE_ERRORS.every((err) => result.brokenReason !== err)
            ) {
                brokenLinksCount += 1;
                console.error(
                    CONSOLE_RED,
                    `Broken link at ${result.base.original} [${result.html.text}](${result.url.original}) -> ${result.brokenReason}`
                );
            }
        },
        end: () => {
            console.log(
                CONSOLE_WHITE,
                `${totalLinksCount} documentation links checked: `,
                brokenLinksCount ? CONSOLE_RED : CONSOLE_GREEN,
                `${brokenLinksCount ? brokenLinksCount : "Congratulations! No"} broken link${
                    brokenLinksCount > 1 ? "s" : ""
                } found. ${brokenLinksCount ? "🙁" : "🙌"}`
            );
        },
    }
);

htmlChecker.enqueue("http://localhost:3000/gooddata-ui/", {});
