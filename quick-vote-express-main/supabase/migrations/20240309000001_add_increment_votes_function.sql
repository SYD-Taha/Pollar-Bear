
CREATE OR REPLACE FUNCTION increment_vote_counts(p_poll_id UUID, p_option_ids UUID[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update vote counts for the selected options
  UPDATE poll_options
  SET votes = votes + 1
  WHERE poll_id = p_poll_id
  AND id = ANY(p_option_ids);
  
  -- Update total votes for the poll
  UPDATE polls
  SET total_votes = total_votes + array_length(p_option_ids, 1)
  WHERE id = p_poll_id;
END;
$$;
