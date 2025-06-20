import { supabase } from './db';
import { Notes } from '../types/membership.types';

export async function insertCampaign(notes: Notes){
  try {
    // Extract UTM parameters
    const utmSource = notes.utm_source || '';
    const utmMedium = notes.utm_medium || '';
    const utmCampaign = notes.utm_campaign || '';
    
    // Skip if no UTM parameters
    if (!utmSource || !utmMedium || !utmCampaign) {
      return { success: false, error: 'Missing UTM parameters' };
    }
    
    console.log("Inserting campaign with notes:", notes);
    
    const { data, error } = await supabase
      .from('statewisetraffic')
      .insert({
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });

    if (error) {
      console.error("Error inserting campaign:", error);
      return { success: false, error: error.message };
    }
    
    console.log("Campaign inserted successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error('Error inserting campaign:', error);
    return { success: false, error: 'Failed to insert campaign' };
  }
}

