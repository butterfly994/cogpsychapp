# Cognitive Psychology Online

View the web application [here](http://sperling-20190730200445-hostingbucket-dev.s3-website-us-east-1.amazonaws.com/). You will need to make an account to participate in the experiment.

This project consists currently of one web application with three pages: a description section that describes the experiment that has been digitized (Sperling's 1960 study on the nature of iconic memory), the experiment itself, and a data visualization page that draws from completed trials. 

## Description of the Experiment

This section is copied verbatim from the description section of the web application: 

     In 1960, George Sperling, cognitive scientist, released a monograph titled "The Information Available in Brief Visual Presentations". He detailed an experimental procedure in which subjects were given index cards with arrays of letters and numbers in various formations, which were briefly illuminated by a tachitoscope. The subjects were then required to write down the letters they could remember from this presentation. Their performance was generally measured in terms of the number of letters in their response which matched the input both in terms of the letter itself and its position.

     Throughout a series of experiments, several parameters were studied. These included exposure duration (how long the letters were visible), which Sperling concluded had a negligible effect on performance, as well as tachitoscope-specific variations with light/dark post-exposure conditions. However, the biggest factor in performance was the distinction between partial and whole reporting. In whole report conditions, subjects were required to write down letters from the entire input with the goal of maximizing the total number of letters correct. In the partial reporting condition, participants would listen for a tone (high, low, or medium), that signaled to them whether to write the first, second, or third row of the letter array only.

     What Sperling found was that the subjects' accuracy in terms of the percent of letters correct in their responses when under the partial report condition was much higher. Sperling then concluded that we form a memory of the letter array that we are subsequently able to read from, but that the memory fades very quickly. Several other parameters that he tested related to partial reports were: the timing of the tone in relation to the exposure to the letter array, and only reporting numbers or only reporting letters.

     This website replicates Sperling's original experiment in a digital format. Many factors are identical to the original study, such as the pitch of the tones used, the types of stimuli, and the timing of exposure to the letter array. Several factors which have not been replicated are: the decay pattern of light from the tachitoscope, Sperling's fifth experiment which involved post-exposure fields from the tachitoscope, and Sperling's sixth and seventh experiments (involving reporting only letters or only numbers, or mandating an order of report, respectively). Due to limited information, the author of this web page has had to infer several experimental details, such as the instructions given to subjects and the duration of the tones.

     Any data collected from this web page is stored without reference to personally identifying information. Further, any data presented on the page is in aggregate, over the average of all participants.
    
    Sperling, G. (1960). The information available in brief visual presentations. Washington, D.C.: American Psychological Association.

Specifically, independent variables in the experiment are: whole report versus partial report conditions (whether the subject is asked to recall all the letters that flash on the screen or one specific row), exposure duration (how long the letters appear on the screen), letter arrangement and number of letters displayed, and delay of instructional tone designating which row is to be reported in the partial report condition.

## Technologies Used and Implementation Details

The web application was developed principally with React, using create-react-app. The Howler library was used to play instructional tones. AWS Amplify was used to configure authentication (using AWS Cognito in the background) and data persistence (using AWS DynamoDB). Specifically, partial report condition and whole report condition data is stored in two separate tables, as they have disparate fields (instructional tone delay is not applicable to the whole report condition, and exposure duration was not varied in the partial report condition), and performance was reported differently (per cent accuracy versus overall letters guessed correctly). Both queries and table mutations are conducted using GraphQL. Graphs are constructed using D3.js. Currently, because of a relative lack of data, no graphs show up on the visualizations page, however, the graphs are structured to be basic line graphs, with a key at the top of the page serving as a reference for the different data point shapes and their meanings.

## Known Issues

* Currently, at lower exposure durations (15, 50 milliseconds), occasionally the letter arrangement is not rendered before the response grid appears.

## Future Work

This is an ongoing project. After a baseline of data has been collected, I will probably buy a more friendly domain for the web application. Below is a list of further features that may be added, in order of priority (highest to lowest).

* Input checking - not letting the subject submit a response if it contains invalid characters (lowercase letters, numbers when the input type had no numbers, vowels, or non-alphanumeric symbols)
* Personalized data visualizations - giving the subject a set of graphs only using their data on the visualizations page. Or, potentially, just showing the subject their personal data in a table format.
* Digitizing other experiments. The next experiment that would be digitized would be Averbach and Coriell's work on the backwards masking phenomenon.
* More elaborate data visualizations and more varied data visualizations from just line graphs
* Digitizing experiment 5 of Sperling's study (varying post-exposure fields). This would involve either showing a dark screen or light screen after the letters flash on the screen.
* Digitizing experiment 6 of Sperling's study. This would involve trials that have the subject only report the numbers that flashed on the screen, or only the letters, depending on an instruction tone
* Digitizing experiment 7 of Sperling's study. This would involve trials that have the subject mandated to write their response in a particular order (from top to bottom, or vice versa), depending on an instruction tone 