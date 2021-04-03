<div class="OLSKDecorNotice">

This document is a work-in-progress. Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).

</div>

Kommit helps you remember what you learn via flashcards and [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition).

Inspired by [Anki](https://apps.ankiweb.net) and other spaced-repetition learning systems, it presents flashcards to you just before your brain is likely to forget, thereby strengthening memory while reducing study time.

When one side is presented, you try to recall the other before flipping it over – this [active recall](https://en.wikipedia.org/wiki/Active_recall) strengthens your memory more than multiple-choice questions.

The cards are presented when you are likely to forget, which [aids memory retention](https://elearninginfographics.com/memory-retention-and-the-forgetting-curve-infographic/) and also reduces the amount of time you need to study. This method can make remembering a choice rather than leaving it up to chance.

It's great for languages, but can also be applied to other domains.

<dl class="OLSKDecorGlossary">
	<h2>My linguistic journey</h2>
	<dt><a href="https://rosano.hmm.garden/01f1wjp6bb4raqdqd4aanb0evn">Teaching languages to friends</a></dt>
	<dd>How I used Kommit collaboratively to exchange languages with friends.</dd>
	<dt><a href="https://rosano.hmm.garden/01eyy9nhtzmx74zqn4gp55nyqp">Learning Portuguese</a></dt>
	<dd>Mistakes and other moments along the way.</dd>
</dl>

# List of decks

This is the starting screen of the app. From here you can create a new deck or select an existing deck.

# Deck page

Once you have selected a deck, you can customize how to present the cards, see some statistics from your reviews, and rename or delete the deck. Click on *KOMReviewDetailToolbarCardsButtonText* to manage cards. Click *KOMReviewDetailPlayButtonText* to start the memory game.

## Game options

*KOMReviewDetailFormAudioIsEnabledFieldLabelText* will automatically play any recorded audio for the card.

*KOMReviewDetailFormFrontSpeechIsEnabledFieldLabelText* or *KOMReviewDetailFormRearSpeechIsEnabledFieldLabelText* will speak the text using any language available on your device. By default it uses the current language, but you can set a [language code](https://www.w3schools.com/tags/ref_language_codes.asp) if your cards use multiple languages. If *KOMReviewDetailFormAudioIsEnabledFieldLabelText* is enabled and there is recorded audio for the same side, only the audio will play.

By default, the cards will be presented both front-to-back and back-to-front, but *KOMReviewDetailFormIsForwardOnlyFieldLabelText* will disable the latter.

*KOMReviewDetailFormRetireCardsFieldLabelText* will automatically remove cards from the schedule after the 'interval' is bigger than the selected period. For example, selecting *KOMReviewDetailFormRetireCardsFieldOptionThreeMonthsText* will retire a card if the next review is more than three months away.

# Memory game

During a review, the cards will be presented in a random order. Try to recall the opposite side without looking, then *KOMPlayFlipButtonText* the card to reveal the following response buttons to schedule the card's next appearance:

- *KOMPlayResponseButtonAgainText*: Clear the schedule and start from scratch
- *KOMPlayResponseButtonNextText*
    - First time: within the next ten minutes
    - Second time: after a few days
    - Subsequently: after progressively larger periods

A maximum of 10 unseen cards will be presented in one game.

## Additional buttons

Optionally, it is possible to enable the following buttons by launching the *KOMReviewLauncherItemToggleSimplifiedResponseButtonsText* command:

- *KOMPlayResponseButtonHardText*
    - First time: within the next ten minutes
    - Second time: after a day or so
    - Subsequently: after progressively larger periods
- *KOMPlayResponseButtonGoodText*
    - First time: within the next ten minutes
    - Second time: after a few days
    - Subsequently: after progressively larger periods, moreso than *KOMPlayResponseButtonHardText*
- *KOMPlayResponseButtonEasyText*
    - First time: after four days
    - Subsequently: after progressively larger periods, moreso than *KOMPlayResponseButtonGoodText*

## Tips

Evaluate yourself based on personal goals. Are you practicing speed? a certain way of responding? a physical sensation? If you are studying languages, are you working on pronounciation? understanding? spelling? grammar?

If your device has a physical keyboard, streamline your responses with [shortcuts](#shortcuts).

You can try [mneumonics and other memory tricks](https://en.wikipedia.org/wiki/Moonwalking_with_Einstein) to help remember – usually the more personal it is, the better.

# Card browser

On the left side of the interface, you can create, search, and select cards. On the right side, you can edit the details.

<div class="OLSKDecorNotice">

Editing the same card on multiple devices at the same time can result in data loss. Editing different cards or playing the game while editing cards is safe.

</div>

*KOMBrowseInfoFormFrontTextFieldText* or *KOMBrowseInfoFormRearTextFieldText* can be used for the question or answer

Each side can have a short audio recording. Click *KOMBrowseInfoAudioRecordButtonText* and allow microphone access to begin recording, then click again to end.

The *KOMBrowseInfoFormFrontReadButtonText* button speaks the text using the language chosen on the deck page.

*KOMBrowseInfoFormNotesFieldText* can be used for any personal comments or memory aids.

*Tags* can be used to organize cards and make them easier to find.

# Statistics

Various figures are calculated based on the state of each card and the amount of time spent.

On the deck page, calculations are based on the selected deck. On the List of decks, calculations are based on all decks combined.

Cards are visually encoded based on the following states:

<table class="KOMGuideStatisticsLegend">

<tr>
	<td><span style="background: KOMGuideTokenColorUnseen;"></span></td>
	<td>KOMReviewChartCompositionCollectionUnseenCardsLabelText</td>
	<td>without any reviews, not scheduled</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorRelearning;"></span></td>
	<td>Relearning</td>
	<td>the *Reset* button was pressed</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorDeveloping;"></span></td>
	<td>KOMReviewChartCompositionCollectionDevelopingCardsLabelText</td>
	<td>scheduled to appear within 21 days</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorMature;"></span></td>
	<td>KOMReviewChartCompositionCollectionMatureCardsLabelText</td>
	<td>scheduled to appear after 21 days</td>
</tr>

<tr>
	<td><span style="background: KOMGuideTokenColorRetired;"></span></td>
	<td>KOMReviewChartCompositionCollectionRetiredCardsLabelText</td>
	<td>removed from the schedule</td>
</tr>

</table>

## KOMReviewGeneralTodayText

All statistics in this section are for the current day.

- *KOMReviewTodayTotalCardsLabelText*: number of cards reviewed.
- *Time*: minutes passed during the memory game.
- *Review accuracy*: percentage of review cards remembered correctly; new cards are not counted.

## KOMReviewGeneralUpcomingHeadingText

The number of *KOMReviewChartCompositionCollectionDevelopingCardsLabelText* and *Mature* cards scheduled on a given day.

## Time

Minutes passed on a given day during the memory game on *KOMReviewChartCompositionCollectionUnseenCardsLabelText*, *Relearning*, *KOMReviewChartCompositionCollectionDevelopingCardsLabelText*, and *KOMReviewChartCompositionCollectionMatureCardsLabelText* cards.

## KOMReviewGeneralCollectionHeadingText

Counting the number of cards based on its state.

# Shortcuts

<div class="OLSKDecorNotice">

*AccessKey* refers to a one or more shortcut keys followed by a single character. Usually it's `Alt` on Windows or `Control+Alt` on macOS, but it changes [based on your browser and operating system](https://www.w3schools.com/tags/att_global_accesskey.asp#table2).

*Launcher* refers to the app's command runner: press `Alt+Enter`, type the command, then press `Enter` to run.

</div>

| List of decks ||
:--- | ---
| KOMReviewMasterCreateButtonText | `AccessKey+n` |
| `KOMReviewLauncherItemSelectDeckText` | Launcher |
| `KOMReviewLauncherItemToggleSimplifiedResponseButtonsText` | Launcher |
| `OLSKTransportLauncherItemImportJSONText` | Launcher |
| `OLSKTransportLauncherItemExportJSONText` | Launcher |
| `KOMReviewMasterLauncherItemToggleExcludeTripleQuestionMarkText` | Launcher |

| Deck page ||
:--- | ---
| Show cards | `AccessKey+c` |
| Play memory game | `AccessKey+g` |
| Close | `Escape` |
| `KOMReviewDetailLauncherItemPlayReviewingText` | Launcher |
| `KOMReviewDetailLauncherItemPlayUnseenText` | Launcher |
| `KOMReviewLauncherItemExportSelectedJSONText` | Launcher |

| Memory game ||
:--- | ---
| Flip card | `Space` |
| Respond *KOMPlayResponseButtonAgainText* | `1` or `x` |
| Respond *KOMPlayResponseButtonHardText* | `2` |
| Respond *KOMPlayResponseButtonGoodText* | `3` or `Space` |
| Respond *KOMPlayResponseButtonEasyText* | `4` |
| Repeat Question | `q` |
| Repeat Answer | `a` |
| Close | `Escape` |

| List of cards ||
:--- | ---
| Create new card | `AccessKey+n` |
| Select previous or next card, if filter field is focused | `Up` or `Down` |
| KOMBrowseInfoToolbarTemplateButtonText | `AccessKey+t` |
| Clear filter text and selected card, focus filter field | `Escape` |
| Close, if filter field is focused | `Escape` |
| `KOMBrowseInfoLauncherItemToggleRetireText` | Launcher |
| `KOMBrowseInfoLauncherItemDebugText` | Launcher |

| Global ||
:--- | ---
| `OLSKRemoteStorageLauncherItemOpenLoginLinkText` | Launcher |
| `OLSKServiceWorkerLauncherItemReloadText` | Launcher |
| `OLSKServiceWorkerLauncherItemDebugForceUpdateText` | Launcher |
| Launcher | `Alt+Enter` |

| Global (when cloud is connected) ||
:--- | ---
| `OLSKRemoteStorageLauncherItemCopyLoginLinkText` | Launcher |
| `OLSKFundLauncherItemEnterClueText` | Launcher |
| `OLSKFundLauncherItemClearClueText` | Launcher |
| `OLSKRemoteStorageLauncherItemDebugFlushDataText` | Launcher |

# Add to Home screen on mobile and tablet devices

This web app can be 'installed' and used as if it were a native mobile app (with an icon, working without internet access, running as a standalone app outside of the browser).

1. [Open the app](KOMReviewRoute) in your browser, then follow the steps based on your operating system:

## iOS + Safari
2. Tap the Share button <img height="22" valign="middle" alt="Share button icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharediOSShare.svg" />
3. Tap *Add to Home Screen* <img height="22" valign="middle" alt="Add to Home Screen icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharediOSA2HS.svg">

## Android + Chrome
2. Tap the More button <img height="22" valign="middle" alt="More button icon" src="/_shared/__external/OLSKUIAssets/_OLSKSharedAndroidMore.svg" />
3. Tap *Add to home screen*

# What are remoteStorage and Fission?

[remoteStorage](https://remotestorage.io) and [Fission](https://fission.codes) are open protocols for synchronizing data between multiple devices. Both take the level of control and flexibility of something like email and bring it to your personal data. You could think of it as a USB key for your documents that you can plug into websites to work on your stuff.

You can get a remoteStorage account for free from [5apps](https://5apps.com/storage/) or [host your own](https://wiki.remotestorage.io/Servers).

You can get a Fission account for free from [Fission Auth](https://auth.fission.codes) or [setup your own server](https://github.com/fission-suite/fission-suite).
