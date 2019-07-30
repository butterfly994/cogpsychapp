import React from 'react'
import './Description.css'

class Description extends React.Component {
    render() {
        return (
            <div className = 'App'>
                <div className = 'paragraph'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    In 1960, George Sperling, cognitive scientist, released a 
                    monograph titled "The Information Available in Brief Visual 
                    Presentations". He detailed an experimental procedure in which 
                    subjects were given index cards with arrays of letters and 
                    numbers in various formations, which were briefly illuminated by 
                    a tachitoscope. The subjects were then required to write down 
                    the letters they could remember from this presentation. Their 
                    performance was generally measured in terms of the number of 
                    letters in their response which matched the input both in 
                    terms of the letter itself and its position.
                </div>
                <div className = 'paragraph'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Throughout a series of experiments, several parameters were 
                    studied. These included exposure duration (how long the letters 
                    were visible), which Sperling concluded had a negligible effect 
                    on performance, as well as tachitoscope-specific variations with 
                    light/dark post-exposure conditions. However, the biggest factor 
                    in performance was the distinction between partial and whole 
                    reporting. In whole report conditions, subjects were required to 
                    write down letters from the entire input with the goal of 
                    maximizing the total number of letters correct. In the partial 
                    reporting condition, participants would listen for a tone (high, 
                    low, or medium), that signaled to them whether to write the first, 
                    second, or third row of the letter array only.
                </div>
                <div className = 'paragraph'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    What Sperling found was that the subjects' accuracy in terms of 
                    the percent of letters correct in their responses when under the 
                    partial report condition was much higher. Sperling then 
                    concluded that we form a memory of the letter array that we are 
                    subsequently able to read from, but that the memory fades very 
                    quickly. Several other parameters that he tested related to 
                    partial reports were: the timing of the tone in relation to the 
                    exposure to the letter array, and only reporting numbers or only 
                    reporting letters.
                </div>
                <div className = 'paragraph'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    This website replicates Sperling's original experiment in a 
                    digital format. Many factors are identical to the original study, 
                    such as the pitch of the tones used, the types of stimuli, and 
                    the timing of exposure to the letter array. Several factors 
                    which have not been replicated are: the decay pattern of light 
                    from the tachitoscope, Sperling's fifth experiment which 
                    involved post-exposure fields from the tachitoscope, and 
                    Sperling's sixth and seventh experiments (involving reporting 
                    only letters or only numbers, or mandating an order of report, 
                    respectively). Due to limited information, the author of this 
                    web page has had to infer several experimental details, such as 
                    the instructions given to subjects and the duration of the tones.
                </div>
                <div className = 'paragraph'>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Any data collected from this web page is stored without 
                    reference to personally identifying information. Further, any 
                    data presented on the page is in aggregate, over the average of
                    all participants. 
                </div>
                <div className = 'paragraph'>
                    Sperling, G. (1960). The information available in brief visual presentations. 
                    Washington, D.C.: American Psychological Association.
                </div>
            </div>
        )
    }
}

export default Description